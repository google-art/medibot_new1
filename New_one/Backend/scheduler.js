import axios from "axios";

/* =====================================
   TOKEN WEBHOOK
===================================== */

const TOKEN_WEBHOOK =
  "https://dharinisrisubramanian.n8n-wsk.com/webhook-test/get_token_from_sheet";

/* =====================================
   POST SOURCE APIs
===================================== */

const TEXT_API = "http://localhost:3001/api/autopost/text";
const ARTICLE_API = "http://localhost:3001/api/autopost/article";
const IMAGE_API = "http://localhost:3001/api/autopost/image";

/* =====================================
   LOCAL STORAGE
===================================== */

let cachedToken = null;
let postsLocal = [];

/* =====================================
   UTILITY
===================================== */

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* =====================================
   FETCH TOKEN
===================================== */

export async function fetchToken() {
  try {

    console.log("🌐 Fetching LinkedIn token...");

    const res = await axios.get(TOKEN_WEBHOOK);

    const token =
      res.data?.[0]?.Linkedin_Access ||
      res.data?.Linkedin_Access;

    if (!token) {
      console.log("❌ Token not found");
      return false;
    }

    cachedToken = token;

    console.log("✅ Token stored successfully");

    return true;

  } catch (err) {

    console.log("❌ Token fetch failed:", err.message);
    return false;

  }
}

/* =====================================
   FETCH POSTS
===================================== */

export async function fetchPostsUntilSuccess() {

  console.log("📡 Fetching posts from APIs...");

  const apiList = [
    { name: "TEXT", url: TEXT_API, done: false },
    { name: "ARTICLE", url: ARTICLE_API, done: false },
    { name: "IMAGE", url: IMAGE_API, done: false }
  ];

  while (apiList.some(api => !api.done)) {

    for (const api of apiList) {

      if (api.done) continue;

      try {

        console.log(`➡ Fetching ${api.name} API`);

        const res = await axios.get(api.url);

        if (res.data?.data) {
          postsLocal.push(...res.data.data);
        }

        api.done = true;

        console.log(`✅ ${api.name} API success`);

      } catch (err) {

        console.log(`❌ ${api.name} API failed`);
        console.log("⏳ Retrying in 20 seconds...");

        await sleep(20000);

      }

    }

  }

  console.log("🎉 All APIs fetched successfully");

}

/* =====================================
   SHOW LOCAL POSTS
===================================== */

export function showLocalPosts() {

  console.log("\n📦 Stored Local Posts\n");

  if (!postsLocal.length) {
    console.log("No scheduled posts found\n");
    return;
  }

  postsLocal.forEach((post, index) => {

    const type =
      post.type ||
      post.post_type ||
      post.Post_type ||
      "Unknown";

    const time = post.scheduled_time || "Not scheduled";
    const status = post.Post_status || "pending";

    console.log(`Post ${index + 1}`);
    console.log(`Type          : ${type}`);
    console.log(`Scheduled Time: ${time}`);
    console.log(`Status        : ${status}`);
    console.log("-----------------------------");

  });

  console.log(`✅ Total Posts Loaded: ${postsLocal.length}\n`);

}

/* =====================================
   GET LINKEDIN USER
===================================== */

async function getLinkedinUser() {

  const res = await axios.get(
    "https://api.linkedin.com/v2/userinfo",
    {
      headers: {
        Authorization: `Bearer ${cachedToken}`
      }
    }
  );

  return res.data.sub;

}

/* =====================================
   POST TO LINKEDIN
===================================== */

async function postToLinkedin(post) {

  const userId = await getLinkedinUser();

  /* =====================================
     HASHTAGS
  ===================================== */

  let hashtags =
    post.hashtags ||
    post["Hashtag's"] ||
    post.Hashtags ||
    [];

  if (typeof hashtags === "string") {

    hashtags = hashtags
      .replace(/,/g, " ")
      .split(/\s+/)
      .filter(Boolean);

  }

  /* =====================================
     IMAGE DETECTION
  ===================================== */

  let image =
    post.url ||
    post.image ||
    post.image_url ||
    post.Image_URL ||
    null;

  if (!image && post.post_type === "image") {
    image = post.post;
  }

  /* =====================================
     CONTENT TEXT
  ===================================== */

  let content = "";

  if (post.post_type !== "image") {

    content =
      post.postContent ||
      post.post ||
      post.caption ||
      post.text ||
      post.description ||
      "";

  }

  content = content.replace(/https?:\/\/\S+/g, "").trim();

  let finalText = cleanLinkedinText(content);

  if (hashtags.length > 0) {

    const hashtagString = hashtags
      .map(tag => tag.startsWith("#") ? tag : "#" + tag)
      .join(" ");

    finalText += "\n\n" + hashtagString;

  }

  finalText = finalText.substring(0, 2900);

  let assetUrn = null;

  /* =====================================
     IMAGE UPLOAD
  ===================================== */

  if (image) {

    console.log("📷 Uploading image...");

    const registerUpload = await axios.post(
      "https://api.linkedin.com/v2/assets?action=registerUpload",
      {
        registerUploadRequest: {
          recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
          owner: `urn:li:person:${userId}`,
          serviceRelationships: [
            {
              relationshipType: "OWNER",
              identifier: "urn:li:userGeneratedContent"
            }
          ]
        }
      },
      {
        headers: {
          Authorization: `Bearer ${cachedToken}`,
          "X-Restli-Protocol-Version": "2.0.0",
          "Content-Type": "application/json"
        }
      }
    );

    const uploadUrl =
      registerUpload.data.value.uploadMechanism[
        "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
      ].uploadUrl;

    assetUrn = registerUpload.data.value.asset;

    const imageFile = await axios.get(image, {
      responseType: "arraybuffer"
    });

    await axios.put(uploadUrl, imageFile.data, {
      headers: {
        "Content-Type": "application/octet-stream"
      }
    });

    console.log("✅ Image uploaded");

  }

  /* =====================================
     CREATE POST
  ===================================== */

  const body = {

    author: `urn:li:person:${userId}`,
    lifecycleState: "PUBLISHED",

    specificContent: {
      "com.linkedin.ugc.ShareContent": {

        shareCommentary: {
          text: finalText
        },

        shareMediaCategory: image ? "IMAGE" : "NONE",

        media: image
          ? [
              {
                status: "READY",
                media: assetUrn
              }
            ]
          : []

      }
    },

    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
    }

  };

  await axios.post(
    "https://api.linkedin.com/v2/ugcPosts",
    body,
    {
      headers: {
        Authorization: `Bearer ${cachedToken}`,
        "X-Restli-Protocol-Version": "2.0.0",
        "Content-Type": "application/json"
      }
    }
  );

  console.log("🚀 Scheduled post published");

}

/* =====================================
   TEXT CLEANER
===================================== */

function cleanLinkedinText(text) {

  if (!text) return "";

  return text
    .replace(/\*\*/g, "")
    .replace(/__/g, "")
    .replace(/`/g, "")
    .trim();

}

/* =====================================
   SCHEDULER
===================================== */

export function startScheduler() {

  console.log("🕒 Scheduler started");

  setInterval(async () => {

    try {

      const now = new Date();

      for (const post of postsLocal) {

        if (!post.scheduled_time) continue;

        const scheduled = new Date(post.scheduled_time);

        const diff = now - scheduled;

        if (
          diff >= 0 &&
          diff < 30000 &&
          (post.Post_status === "Scheduled" || post.Post_status === "pending")
        ) {

          console.log("⏰ Posting scheduled post:", post.post_type);

          post.Post_status = "posting";

          try {

            await postToLinkedin(post);

            post.Post_status = "published";

          } catch (err) {

            console.log("❌ Post failed:", err.response?.data || err.message);

            post.Post_status = "failed";

          }

        }

      }

    } catch (err) {

      console.log("❌ Scheduler error:", err.message);

    }

  }, 30000);

}