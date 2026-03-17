import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

import { createServer } from "http";
import { Server } from "socket.io";

import drivebotRoutes from "./drivebot.js";
import medibotRoutes from "./medibot.js";
import autopostRoutes from "./autopost.js";
import linkedinAuthRoutes from "./linkedinAuth.js";
import socialPost from "./socialPost.js";
// import { startScheduler } from "./scheduler.js";
import {
  fetchToken,
  fetchPostsUntilSuccess,
  showLocalPosts,
  startScheduler
} from "./scheduler.js";


dotenv.config();

/* =========================================================
   🚀 APP INIT
========================================================= */

const app = express();
const PORT = process.env.PORT || 3001;

/* =========================================================
   🌐 CORS CONFIGURATION
========================================================= */

const allowedOrigins = [
  process.env.FRONTEND_ORIGIN,
  "http://localhost:5173",
  "http://localhost:5174",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {

      // Allow Postman / curl
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error(`❌ CORS blocked for origin: ${origin}`);

      return callback(
        new Error(`CORS blocked for origin: ${origin}`),
        false
      );
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* =========================================================
   📦 BODY PARSER
========================================================= */

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true }));

/* =========================================================
   🏠 ROOT ROUTE
========================================================= */

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "🤖 AI Backend Running",
    services: ["DriveBot", "MediBot", "AutoPost"],
    timestamp: new Date().toISOString(),
  });
});

/* =========================================================
   ⚙️ SETTINGS FETCH ROUTE
========================================================= */

app.get("/api/settings", async (req, res) => {

  try {

    const response = await axios.get(
      "https://dharinisrisubramanian.n8n-wsk.com/webhook-test/Setting_to_patients"
    );

    console.log("WEBHOOK RESPONSE:", response.data);

    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {

    console.error("❌ Error fetching settings:", error.message);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

});

/* =========================================================
   🚦 ROUTES
========================================================= */

// Medibot test route
app.use("/api/medibot-test", medibotRoutes);

// Medibot main
app.use("/api/medibot", medibotRoutes);

// Drivebot
app.use("/api", drivebotRoutes);

// AutoPost
app.use("/api/autopost", autopostRoutes);

// LinkedIn Auth
app.use("/auth/linkedin", linkedinAuthRoutes);

// Social Posting
app.use("/api/social", socialPost);

/* =========================================================
   ❌ 404 HANDLER
========================================================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

/* =========================================================
   🔥 ERROR HANDLER
========================================================= */

app.use((err, req, res, next) => {

  console.error("🔥 Server Error:", err.message);

  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
  });

});

/* =========================================================
   🔌 SOCKET SERVER
========================================================= */

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

io.on("connection", (socket) => {

  console.log("🟢 Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });

});

async function bootSystem() {

  const tokenReady = await fetchToken();

  if (!tokenReady) {
    console.log("❌ Cannot start system without token");
    return;
  }

  await fetchPostsUntilSuccess();

  showLocalPosts();  

  startScheduler();

}



/* =========================================================
   🚀 START SERVER
========================================================= */

httpServer.listen(PORT, () => {

  console.log(`
🚀 AI Backend Server Started
────────────────────────────
📍 Backend: http://localhost:${PORT}
🌐 Frontend Allowed: ${allowedOrigins.join(", ")}

⚙️ Settings API → /api/settings
🤖 DriveBot  → /api/*
🎙️ MediBot   → /api/medibot/*
📢 AutoPost  → /api/autopost/*
🔌 Socket.io Ready
`);

  /* ============================
     START SCHEDULER ENGINE
  ============================ */

  bootSystem();

});