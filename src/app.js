





















const express = require("express");
const cors = require("cors");

// Load env safely (Render injects env vars automatically)
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const activityRoutes = require("./routes/activityRoutes");
const challengeRoutes = require("./routes/challengeRoutes");

// ⚠️ DO NOT import OpenAI here
// It must be initialized lazily inside routes only

const app = express();

/* ======================
   CORS (PRODUCTION SAFE)
====================== */
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev
      process.env.FRONTEND_URL, // Render / prod frontend
    ].filter(Boolean),
    credentials: true,
  })
);

/* ======================
   MIDDLEWARE
====================== */
app.use(express.json());

/* ======================
   ROUTES
====================== */
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/challenge", challengeRoutes);

/* ======================
   AI ROUTES (SAFE LOAD)
====================== */
if (process.env.OPENAI_API_KEY) {
  const aiCoachRoutes = require("./routes/aiCoachRoutes");
  app.use("/api/ai", aiCoachRoutes);
  console.log("✅ AI routes enabled");
} else {
  console.warn("⚠️ OPENAI_API_KEY missing — AI routes disabled");
}

/* ======================
   HEALTH CHECK
====================== */
app.get("/", (req, res) => {
  res.status(200).json({ status: "Backend running" });
});

module.exports = app;
