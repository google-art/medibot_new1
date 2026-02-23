// import express from "express";
// import cors from "cors";
// import fetch from "node-fetch";
// import crypto from "crypto";

// const app = express();
// const PORT = 3001;

// /* -------------------- MIDDLEWARE -------------------- */
// app.use(cors({ origin: "*" }));
// app.use(express.json());

// /* -------------------- SESSION STORE -------------------- */
// const sessions = new Map();

// const generateSessionId = () =>
//   "session-" + crypto.randomBytes(6).toString("hex");

// /* -------------------- N8N WEBHOOK URL -------------------- */
// const N8N_WEBHOOK =
//   "https://dharinisrisubramanian.n8n-wsk.com/webhook/driving-school-chat";

// /* -------------------- HEALTH -------------------- */
// app.get("/api/health", (req, res) => {
//   res.json({
//     status: "OK",
//     serverTime: new Date().toISOString(),
//     activeSessions: sessions.size,
//   });
// });

// /* -------------------- NEW SESSION -------------------- */
// app.post("/api/session/new", (req, res) => {
//   const sessionId = generateSessionId();

//   sessions.set(sessionId, {
//     createdAt: Date.now(),
//     history: [],
//   });

//   res.json({
//     sessionId,
//     greeting:
//       "🚗 Welcome to ABC Driving School!\n\n1️⃣ New Booking\n2️⃣ Reschedule\n3️⃣ Cancel Booking",
//   });
// });

// /* -------------------- TEST MODE -------------------- */
// app.post("/api/test", (req, res) => {
//   const sessionId = req.body.sessionId || generateSessionId();

//   res.json({
//     reply:
//       "🧪 TEST MODE ACTIVE\n\nThis is a local response.\n\nHow can I help you?",
//     sessionId,
//     mode: "test",
//   });
// });

// /* -------------------- CHAT (LIVE → n8n) -------------------- */
// app.post("/api/chat", async (req, res) => {
//   try {
//     const { message, sessionId } = req.body;

//     if (!message) {
//       return res.status(400).json({ error: "Message required" });
//     }

//     const currentSessionId = sessionId || generateSessionId();

//     if (!sessions.has(currentSessionId)) {
//       sessions.set(currentSessionId, { history: [] });
//     }

//     const response = await fetch(N8N_WEBHOOK, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         message,
//         sessionId: currentSessionId,
//       }),
//     });

//     const text = await response.text();

//     let data;
//     try {
//       data = JSON.parse(text);
//     } catch {
//       data = { reply: text };
//     }

//     res.json({
//       reply: data.reply || "✅ Connected to n8n",
//       sessionId: currentSessionId,
//       mode: "production",
//     });
//   } catch (err) {
//     console.error("❌ n8n error:", err.message);
//     res.json({
//       reply:
//         "❌ Unable to reach n8n.\n\nCheck webhook URL or workflow activation.",
//       emergency: true,
//     });
//   }
// });

// /* -------------------- START SERVER -------------------- */
// app.listen(PORT, () => {
//   console.log(`
// ✅ Backend Server Running
// ────────────────────────
// 📍 http://localhost:${PORT}
// 🩺 GET  /api/health
// 💬 POST /api/chat
// 🧪 POST /api/test
// 🆕 POST /api/session/new
// `);
// });
import express from "express";
import fetch from "node-fetch";
import crypto from "crypto";

const router = express.Router();

/* -------------------- SESSION STORE -------------------- */
const sessions = new Map();

const generateSessionId = () =>
  "session-" + crypto.randomBytes(6).toString("hex");

/* -------------------- N8N WEBHOOK -------------------- */
const N8N_WEBHOOK =
  "https://dharinisrisubramanian.n8n-wsk.com/webhook/driving-school-chat";

/* -------------------- HEALTH -------------------- */
router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    serverTime: new Date().toISOString(),
    activeSessions: sessions.size,
  });
});

/* -------------------- NEW SESSION -------------------- */
router.post("/session/new", (req, res) => {
  const sessionId = generateSessionId();

  sessions.set(sessionId, {
    createdAt: Date.now(),
    history: [],
  });

  res.json({
    sessionId,
    greeting:
      "🚗 Welcome to ABC Driving School!\n\n1️⃣ New Booking\n2️⃣ Reschedule\n3️⃣ Cancel Booking",
  });
});

/* -------------------- TEST MODE -------------------- */
router.post("/test", (req, res) => {
  const sessionId = req.body.sessionId || generateSessionId();

  res.json({
    reply:
      "🧪 TEST MODE ACTIVE\n\nThis is a local response.\n\nHow can I help you?",
    sessionId,
    mode: "test",
  });
});

/* -------------------- CHAT → n8n -------------------- */
router.post("/chat", async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const currentSessionId = sessionId || generateSessionId();

    if (!sessions.has(currentSessionId)) {
      sessions.set(currentSessionId, { history: [] });
    }

    const response = await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        sessionId: currentSessionId,
      }),
    });

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { reply: text };
    }

    res.json({
      reply: data.reply || "✅ Connected to n8n",
      sessionId: currentSessionId,
      mode: "production",
    });
  } catch (err) {
    console.error("❌ n8n error:", err.message);
    res.json({
      reply:
        "❌ Unable to reach n8n.\n\nCheck webhook URL or workflow activation.",
      emergency: true,
    });
  }
});

export default router;
