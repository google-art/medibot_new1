// 12/03/2026  -  Creted and Work By Abishek - File for :  Fetching and Update Posting a Sheduled Post

import express from "express";
import axios from "axios";

const router = express.Router();

/* =====================================================
   📥 GET DATA FROM N8N (FETCH SCHEDULED POSTS)
===================================================== */

/* ---------- TEXT POSTS ---------- */
router.get("/text", async (req, res) => {
  try {

    const response = await axios.get(
      "https://dharinisrisubramanian.n8n-wsk.com/webhook-test/get_autopost_text_Details"
    );

    return res.json({
      success: true,
      type: "text",
      data: response.data
    });

  } catch (err) {

    console.error("❌ GET TEXT ERROR:", err.message);

    return res.status(500).json({
      success: false,
      error: err.message
    });

  }
});


/* ---------- ARTICLE POSTS ---------- */
router.get("/article", async (req, res) => {
  try {

    const response = await axios.get(
      "https://dharinisrisubramanian.n8n-wsk.com/webhook-test/get_autopost_article_Details"
    );

    return res.json({
      success: true,
      type: "article",
      data: response.data
    });

  } catch (err) {

    console.error("❌ GET ARTICLE ERROR:", err.message);

    return res.status(500).json({
      success: false,
      error: err.message
    });

  }
});


/* ---------- IMAGE POSTS ---------- */
router.get("/image", async (req, res) => {
  try {

    const response = await axios.get(
      "https://dharinisrisubramanian.n8n-wsk.com/webhook-test/get_autopost_image_Details"
    );

    return res.json({
      success: true,
      type: "image",
      data: response.data
    });

  } catch (err) {

    console.error("❌ GET IMAGE ERROR:", err.message);

    return res.status(500).json({
      success: false,
      error: err.message
    });

  }
});


/* =====================================================
   📤 POST DATA TO N8N (UPDATE / EDIT SCHEDULED POSTS)
===================================================== */

/* ---------- TEXT POST ---------- */
router.post("/text", async (req, res) => {
  try {

    const payload = req.body;

    const response = await axios.post(
      "https://dharinisrisubramanian.n8n-wsk.com/webhook-test/Post_autopost_text_Details",
      payload
    );

    return res.json({
      success: true,
      message: "✅ Text post sent to automation",
      data: response.data
    });

  } catch (err) {

    console.error("❌ POST TEXT ERROR:", err.message);

    return res.status(500).json({
      success: false,
      error: err.message
    });

  }
});


/* ---------- ARTICLE POST ---------- */
router.post("/article", async (req, res) => {
  try {

    const payload = req.body;

    const response = await axios.post(
      "https://dharinisrisubramanian.n8n-wsk.com/webhook-test/Post_autopost_article_Details",
      payload
    );

    return res.json({
      success: true,
      message: "✅ Article post sent to automation",
      data: response.data
    });

  } catch (err) {

    console.error("❌ POST ARTICLE ERROR:", err.message);

    return res.status(500).json({
      success: false,
      error: err.message
    });

  }
});


/* ---------- IMAGE POST ---------- */
router.post("/image", async (req, res) => {
  try {

    const payload = req.body;

    const response = await axios.post(
      "https://dharinisrisubramanian.n8n-wsk.com/webhook-test/Post_autopost_image_Details",
      payload
    );

    return res.json({
      success: true,
      message: "✅ Image post sent to automation",
      data: response.data
    });

  } catch (err) {

    console.error("❌ POST IMAGE ERROR:", err.message);

    return res.status(500).json({
      success: false,
      error: err.message
    });

  }
});


/* =====================================================
   🚀 EXPORT ROUTER
===================================================== */

export default router;