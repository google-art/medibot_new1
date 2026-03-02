import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { createServer } from "http";
import { Server } from "socket.io";

import drivebotRoutes from "./drivebot.js";
import medibotRoutes from "./medibot.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

/* =========================================================
   🌐 CORS CONFIGURATION
========================================================= */

const allowedOrigins = [
  process.env.FRONTEND_ORIGIN,
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow tools like Postman / curl
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

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
app.use("/api/medibot-test", medibotRoutes);

/* =========================================================
   🏠 ROOT ROUTE
========================================================= */

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "🤖 AI Backend Running",
    services: ["DriveBot", "MediBot"],
    timestamp: new Date().toISOString(),
  });
});

/* =========================================================
   🚦 ROUTES (IMPORTANT ORDER)
========================================================= */

// ✅ Medibot first (so it doesn't get swallowed by /api)
app.use("/api/medibot", medibotRoutes);

// ✅ Then drivebot
app.use("/api", drivebotRoutes);

/* =========================================================
   ❌ 404 HANDLER
========================================================= */

app.use((req, res) => {
  res.status(404).json({
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
   🚀 START SERVER + SOCKET
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

httpServer.listen(PORT, () => {
  console.log(`
🚀 AI Backend Server Started
────────────────────────────
📍 Backend: http://localhost:${PORT}
🌐 Frontend Allowed: ${process.env.FRONTEND_ORIGIN}

🤖 DriveBot  → /api/*
🎙️ MediBot   → /api/medibot/*
🔌 Socket.io Ready
`);
});