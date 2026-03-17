
// // 11/03/2026 - Created and Work By Abishek - File for  Post Now 

// // import express from "express";
// // import axios from "axios";

// // const router = express.Router();

// // /* =====================================
// //    TOKEN WEBHOOK
// // ===================================== */

// // const TOKEN_WEBHOOK =
// //   "https://dharinisrisubramanian.n8n-wsk.com/webhook-test/get_token_from_sheet";

// // /* =====================================
// //    TOKEN CACHE
// // ===================================== */

// // let cachedToken = null;
// // let tokenFetchedAt = null;

// // const TOKEN_CACHE_TIME = 60 * 60 * 1000; // 1 hour

// // /* =====================================
// //    GET TOKEN FUNCTION
// // ===================================== */

// // async function getLinkedinToken() {
// //   try {

// //     /* ---------- 1️⃣ Check cache ---------- */

// //     if (
// //       cachedToken &&
// //       tokenFetchedAt &&
// //       Date.now() - tokenFetchedAt < TOKEN_CACHE_TIME
// //     ) {
// //       console.log("⚡ Using cached token");
// //       return cachedToken;
// //     }

// //     /* ---------- 2️⃣ Fetch from webhook ---------- */

// //     console.log("🌐 Fetching token from webhook...");

// //     const tokenRes = await axios.get(TOKEN_WEBHOOK);

// //     const data = tokenRes.data;

// //     console.log("Webhook response:", data);

// //     /* ---------- 3️⃣ Extract token ---------- */

// //     let token = null;

// //     if (Array.isArray(data)) {
// //       token = data[0]?.Linkedin_Access;
// //     } else {
// //       token = data?.Linkedin_Access;
// //     }

// //     if (!token) {
// //       console.log("❌ Token not found in webhook response");
// //       return null;
// //     }

// //     /* ---------- 4️⃣ Save to cache ---------- */

// //     cachedToken = token;
// //     tokenFetchedAt = Date.now();

// //     console.log("✅ Token cached successfully");

// //     return token;

// //   } catch (err) {

// //     console.error("❌ Token fetch error:", err.message);
// //     return null;

// //   }
// // }

// // /* =====================================
// //    CHECK LINKEDIN CONNECTION
// // ===================================== */

// // router.get("/check-linkedin", async (req, res) => {

// //   try {

// //     const token = await getLinkedinToken();

// //     if (!token) {

// //       return res.json({
// //         connected: false,
// //         login_url: "/auth/linkedin/login"
// //       });

// //     }

// //     res.json({
// //       connected: true
// //     });

// //   } catch (err) {

// //     console.error("Connection check failed:", err);

// //     res.status(500).json({
// //       connected: false
// //     });

// //   }

// // });

// // /* =====================================
// //    POST TO LINKEDIN
// // ===================================== */

// // router.post("/post-now", async (req, res) => {

// //   try {

// //     // const { content } = req.body;

// //     // if (!content) {
// //     //   return res.status(400).json({
// //     //     success: false,
// //     //     error: "Content missing"
// //     //   });
// //     // }
// //     const { content, image } = req.body;

// //     if (!content && !image) {
// //       return res.status(400).json({
// //         success: false,
// //         error: "Content or image required"
// //       });
// //     }
// //     /* ---------- 1️⃣ Get token ---------- */

// //     const token = await getLinkedinToken();

// //     if (!token) {
// //       return res.json({
// //         success: false,
// //         error: "User not logged in"
// //       });
// //     }

// //     /* ---------- 2️⃣ Get LinkedIn user profile ---------- */

// //     const profileRes = await axios.get(
// //       "https://api.linkedin.com/v2/userinfo",
// //       {
// //         headers: {
// //           Authorization: `Bearer ${token}`
// //         }
// //       }
// //     );

// //     const userId = profileRes.data.sub;

// //     console.log("👤 LinkedIn User:", userId);

// //     /* ---------- 3️⃣ Build Post ---------- */

// //     const postBody = {
// //       author: `urn:li:person:${userId}`,
// //       lifecycleState: "PUBLISHED",
// //       specificContent: {
// //         "com.linkedin.ugc.ShareContent": {
// //           shareCommentary: {
// //             text: content
// //           },
// //           shareMediaCategory: "NONE"
// //         }
// //       },
// //       visibility: {
// //         "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
// //       }
// //     };

// //     /* ---------- 4️⃣ Send Post ---------- */

// //     await axios.post(
// //       "https://api.linkedin.com/v2/ugcPosts",
// //       postBody,
// //       {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           "X-Restli-Protocol-Version": "2.0.0",
// //           "Content-Type": "application/json"
// //         }
// //       }
// //     );

// //     console.log("🚀 Posted to LinkedIn successfully");

// //     res.json({
// //       success: true
// //     });

// //   } catch (error) {

// //     console.log(
// //       "❌ LinkedIn Post Error:",
// //       error.response?.data || error.message
// //     );

// //     res.status(500).json({
// //       success: false,
// //       error: "LinkedIn post failed"
// //     });

// //   }

// // });

// // export default router;





// // 11/03/2026 - Created and Work By Abishek - File for Post Now

// import express from "express";   // FIX 1
// import axios from "axios";

// const router = express.Router();

// /* =====================================
//    TOKEN WEBHOOK
// ===================================== */

// const TOKEN_WEBHOOK =
//   "https://dharinisrisubramanian.n8n-wsk.com/webhook-test/get_token_from_sheet";

// /* =====================================
//    TOKEN CACHE
// ===================================== */

// let cachedToken = null;
// let tokenFetchedAt = null;

// const TOKEN_CACHE_TIME = 60 * 60 * 1000; // 1 hour

// /* =====================================
//    GET TOKEN FUNCTION
// ===================================== */

// async function getLinkedinToken() {
//   try {

//     if (
//       cachedToken &&
//       tokenFetchedAt &&
//       Date.now() - tokenFetchedAt < TOKEN_CACHE_TIME
//     ) {
//       console.log("⚡ Using cached token");
//       return cachedToken;
//     }

//     console.log("🌐 Fetching token from webhook...");

//     const tokenRes = await axios.get(TOKEN_WEBHOOK);
//     const data = tokenRes.data;

//     console.log("Webhook response:", data);

//     let token = null;

//     if (Array.isArray(data)) {
//       token = data[0]?.Linkedin_Access;
//     } else {
//       token = data?.Linkedin_Access;
//     }

//     if (!token) {
//       console.log("❌ Token not found in webhook response");
//       return null;
//     }

//     cachedToken = token;
//     tokenFetchedAt = Date.now();

//     console.log("✅ Token cached successfully");

//     return token;

//   } catch (err) {

//     console.error("❌ Token fetch error:", err.message);
//     return null;

//   }
// }

// /* =====================================
//    CHECK LINKEDIN CONNECTION
// ===================================== */

// router.get("/check-linkedin", async (req, res) => {

//   try {

//     const token = await getLinkedinToken();

//     if (!token) {

//       return res.json({
//         connected: false,
//         login_url: "/auth/linkedin/login"
//       });

//     }

//     res.json({
//       connected: true
//     });

//   } catch (err) {

//     console.error("Connection check failed:", err);

//     res.status(500).json({
//       connected: false
//     });

//   }

// });

// /* =====================================
//    POST TO LINKEDIN
// ===================================== */

// router.post("/post-now", async (req, res) => {

//   try {

//     const { content, image } = req.body;

//     if (!content && !image) {
//       return res.status(400).json({
//         success: false,
//         error: "Content or image required"
//       });
//     }

//     // FIX 2 — prevent image post
//     if (image) {
//       return res.json({
//         success: false,
//         error: "Image posting not implemented yet"
//       });
//     }

//     /* ---------- 1️⃣ Get token ---------- */

//     const token = await getLinkedinToken();

//     if (!token) {
//       return res.json({
//         success: false,
//         error: "User not logged in"
//       });
//     }

//     /* ---------- 2️⃣ Get LinkedIn user profile ---------- */

//     const profileRes = await axios.get(
//       "https://api.linkedin.com/v2/userinfo",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );

//     const userId = profileRes.data.sub;

//     console.log("👤 LinkedIn User:", userId);

//     /* ---------- 3️⃣ Build Post ---------- */

//     const postBody = {
//       author: `urn:li:person:${userId}`,
//       lifecycleState: "PUBLISHED",
//       specificContent: {
//         "com.linkedin.ugc.ShareContent": {
//           shareCommentary: {
//             text: content
//           },
//           shareMediaCategory: "NONE"
//         }
//       },
//       visibility: {
//         "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
//       }
//     };

//     /* ---------- 4️⃣ Send Post ---------- */

//     await axios.post(
//       "https://api.linkedin.com/v2/ugcPosts",
//       postBody,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "X-Restli-Protocol-Version": "2.0.0",
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     console.log("🚀 Posted to LinkedIn successfully");

//     res.json({
//       success: true
//     });

//   } catch (error) {

//     console.log(" LinkedIn Post Error:");
//     console.log(error.response?.data);
//     console.log(error.message);

//     res.status(500).json({
//       success: false,
//       error: error.response?.data || error.message
//     });

//   }

// });

// export default router;



import express from "express";
import axios from "axios";

const router = express.Router();

/* =====================================
   TOKEN WEBHOOK
===================================== */

const TOKEN_WEBHOOK =
  "https://dharinisrisubramanian.n8n-wsk.com/webhook-test/get_token_from_sheet";

/* =====================================
   TOKEN CACHE
===================================== */

let cachedToken = null;
let tokenFetchedAt = null;

const TOKEN_CACHE_TIME = 60 * 60 * 1000; // 1 hour

/* =====================================
   GET LINKEDIN TOKEN
===================================== */

async function getLinkedinToken() {

  try {

    if (
      cachedToken &&
      tokenFetchedAt &&
      Date.now() - tokenFetchedAt < TOKEN_CACHE_TIME
    ) {
      console.log("⚡ Using cached token");
      return cachedToken;
    }

    console.log("🌐 Fetching token from webhook...");

    const tokenRes = await axios.get(TOKEN_WEBHOOK);
    const data = tokenRes.data;

    console.log("Webhook response:", data);

    let token = null;

    if (Array.isArray(data)) {
      token = data[0]?.Linkedin_Access;
    } else {
      token = data?.Linkedin_Access;
    }

    if (!token) {
      console.log("❌ Token not found");
      return null;
    }

    cachedToken = token;
    tokenFetchedAt = Date.now();

    console.log("✅ Token cached");

    return token;

  } catch (err) {

    console.error("❌ Token fetch error:", err.message);
    return null;

  }

}

/* =====================================
   CHECK LINKEDIN CONNECTION
===================================== */

router.get("/check-linkedin", async (req, res) => {

  try {

    const token = await getLinkedinToken();

    if (!token) {

      return res.json({
        connected: false,
        login_url: "/auth/linkedin/login"
      });

    }

    res.json({
      connected: true
    });

  } catch (err) {

    console.error("Connection check failed:", err);

    res.status(500).json({
      connected: false
    });

  }

});

/* =====================================
   POST TO LINKEDIN (TEXT / IMAGE)
===================================== */

// router.post("/post-now", async (req, res) => {

//   try {

//     const { content, image } = req.body;

//     if (!content && !image) {

//       return res.status(400).json({
//         success: false,
//         error: "Content or image required"
//       });

//     }

//     /* ---------- 1️⃣ GET TOKEN ---------- */

//     const token = await getLinkedinToken();

//     if (!token) {

//       return res.json({
//         success: false,
//         error: "User not logged in"
//       });

//     }

//     /* ---------- 2️⃣ GET USER PROFILE ---------- */

//     const profileRes = await axios.get(
//       "https://api.linkedin.com/v2/userinfo",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );

//     const userId = profileRes.data.sub;

//     console.log("👤 LinkedIn User:", userId);

//     let assetUrn = null;

//     /* =====================================
//        IMAGE UPLOAD FLOW
//     ===================================== */

//     if (image) {

//       console.log("📷 Registering image upload");

//       const registerUpload = await axios.post(
//         "https://api.linkedin.com/v2/assets?action=registerUpload",
//         {
//           registerUploadRequest: {
//             recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
//             owner: `urn:li:person:${userId}`,
//             serviceRelationships: [
//               {
//                 relationshipType: "OWNER",
//                 identifier: "urn:li:userGeneratedContent"
//               }
//             ]
//           }
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "X-Restli-Protocol-Version": "2.0.0",
//             "Content-Type": "application/json"
//           }
//         }
//       );

//       const uploadUrl =
//         registerUpload.data.value.uploadMechanism[
//           "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
//         ].uploadUrl;

//       assetUrn = registerUpload.data.value.asset;

//       console.log("🟢 Upload URL received");

//       /* ---------- 3️⃣ DOWNLOAD IMAGE ---------- */

//       const imageFile = await axios.get(image, {
//         responseType: "arraybuffer"
//       });

//       /* ---------- 4️⃣ UPLOAD IMAGE ---------- */

//       await axios.put(uploadUrl, imageFile.data, {
//         headers: {
//           "Content-Type": "image/jpeg"
//         }
//       });

//       console.log("✅ Image uploaded to LinkedIn");

//     }

//     /* =====================================
//        CREATE LINKEDIN POST
//     ===================================== */

//     const postBody = {

//       author: `urn:li:person:${userId}`,
//       lifecycleState: "PUBLISHED",

//       specificContent: {
//         "com.linkedin.ugc.ShareContent": {

//           shareCommentary: {
//             text: content || ""
//           },

//           shareMediaCategory: image ? "IMAGE" : "NONE",

//           media: image
//             ? [
//                 {
//                   status: "READY",
//                   description: {
//                     text: "Image"
//                   },
//                   media: assetUrn,
//                   title: {
//                     text: "Post Image"
//                   }
//                 }
//               ]
//             : []
//         }
//       },

//       visibility: {
//         "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
//       }

//     };

//     /* ---------- 5️⃣ CREATE POST ---------- */

//     await axios.post(
//       "https://api.linkedin.com/v2/ugcPosts",
//       postBody,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "X-Restli-Protocol-Version": "2.0.0",
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     console.log("🚀 Posted to LinkedIn successfully");

//     res.json({
//       success: true
//     });

//   } catch (error) {

//     console.log("❌ LinkedIn Post Error");

//     console.log(error.response?.data || error.message);

//     res.status(500).json({
//       success: false,
//       error: error.response?.data || error.message
//     });

//   }

// });
router.post("/post-now", async (req, res) => {

  try {

    const { content, hashtags, image } = req.body;

    if (!content && !image) {

      return res.status(400).json({
        success: false,
        error: "Content or image required"
      });

    }

    /* ---------- MERGE HASHTAGS ---------- */

    let finalText = content || "";

    if (hashtags && Array.isArray(hashtags)) {

      finalText += "\n\n" + hashtags.join(" ");

    }

    /* ---------- GET TOKEN ---------- */

    const token = await getLinkedinToken();

    if (!token) {

      return res.json({
        success: false,
        error: "User not logged in"
      });

    }

    /* ---------- GET USER PROFILE ---------- */

    const profileRes = await axios.get(
      "https://api.linkedin.com/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const userId = profileRes.data.sub;

    let assetUrn = null;

    /* =====================================
       IMAGE UPLOAD FLOW
    ===================================== */

    if (image) {

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
            Authorization: `Bearer ${token}`,
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
          "Content-Type": "image/jpeg"
        }
      });

    }

    /* =====================================
       CREATE LINKEDIN POST
    ===================================== */

    const postBody = {

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
      postBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Restli-Protocol-Version": "2.0.0",
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      success: true
    });

  } catch (error) {

    console.log("❌ LinkedIn Post Error");

    console.log(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });

  }

});
export default router;