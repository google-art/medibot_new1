// 10/03/2026 - Created and Work By Prathibha

// 11/03/2026 - Work by Abishek - Changes : File Upgrade , make run with server

import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const REDIRECT_URI =
  process.env.LINKEDIN_REDIRECT_URI ||
  "http://localhost:3001/auth/linkedin/callback";

const WEBHOOK_URL = "https://dharinisrisubramanian.n8n-wsk.com/webhook-test/upload_access_token";

/* =====================================
   FUNCTION: CREATE LINKEDIN POST
===================================== */

async function postToLinkedIn(accessToken, userId) {
  const postData = {
    author: `urn:li:person:${userId}`,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: {
          text: `🔥 AutoPost Test - ${new Date().toLocaleString()}`,
        },
        shareMediaCategory: "NONE",
      },
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
    },
  };

  try {
    await axios.post(
      "https://api.linkedin.com/v2/ugcPosts",
      postData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Restli-Protocol-Version": "2.0.0",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Post successfully created on LinkedIn");
  } catch (error) {
    console.log(
      "❌ LinkedIn Post Error:",
      error.response?.data || error.message
    );
  }
}

/* =====================================
   HOME PAGE
===================================== */

router.get("/", (req, res) => {
  res.send(`
    <h2>LinkedIn AutoPost Test</h2>
    <a href="/auth/linkedin/login">
      <button style="padding:10px 20px;font-size:16px;">
        Login with LinkedIn
      </button>
    </a>
  `);
});

/* =====================================
   STEP 1: REDIRECT TO LINKEDIN LOGIN
===================================== */

router.get("/login", (req, res) => {

  const authURL =
    "https://www.linkedin.com/oauth/v2/authorization" +
    "?response_type=code" +
    `&client_id=${CLIENT_ID}` +
    `&redirect_uri=${REDIRECT_URI}` +
    "&scope=openid profile email w_member_social" +
    "&prompt=login" +
    "&auth_type=reauthenticate";

  res.redirect(authURL);
});

/* =====================================
   STEP 2: LINKEDIN CALLBACK
===================================== */

router.get("/callback", async (req, res) => {

  const code = req.query.code;

  if (!code) {
    return res.send("❌ Authorization code not received");
  }

  try {

    /* ===== GET ACCESS TOKEN ===== */

    const tokenRes = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      null,
      {
        params: {
          grant_type: "authorization_code",
          code: code,
          redirect_uri: REDIRECT_URI,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        },
      }
    );

    const accessToken = tokenRes.data.access_token;

    console.log("🔑 LinkedIn Access Token:", accessToken);

    /* ===== GET USER INFO ===== */

    const user = await axios.get(
      "https://api.linkedin.com/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userId = user.data.sub;

    console.log("👤 LinkedIn User ID:", userId);

    /* =====================================
       SEND TOKEN TO WEBHOOK
    ===================================== */

    await axios.post(WEBHOOK_URL, {
      access_token: accessToken,
      user_id: userId,
      platform: "linkedin",
      created_at: new Date().toISOString()
    });

    console.log("📡 Token sent to webhook");

    /* ===== CREATE TEST POST ===== */

    await postToLinkedIn(accessToken, userId);

    /* ===== SUCCESS PAGE ===== */

    res.send(`
      <h2 style="color:green;">✅ Logged in Successfully</h2>
      <h3>🚀 LinkedIn Connected!</h3>
      <p>Redirecting back to app...</p>

      <script>
        setTimeout(() => {
          window.location.href = "http://localhost:5173/maindoctor/socialmedia";
        }, 2000);
      </script>
    `);

  } catch (err) {

    console.log("❌ ERROR:", err.response?.data || err.message);

    res.send(`
      <h2 style="color:red;">❌ Failed</h2>
      <pre>${JSON.stringify(
        err.response?.data || err.message,
        null,
        2
      )}</pre>
      <a href="/auth/linkedin">Try Again</a>
    `);

  }

});

export default router;