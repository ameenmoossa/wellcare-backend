


// const express = require("express");
// const cors = require("cors");

// // ROUTES
// const authRoutes = require("./routes/authRoutes");
// const challengeRoutes = require("./routes/challengeRoutes");
// const aiCoachRoutes = require("./routes/aiCoachRoutes");
// const userRoutes = require("./routes/userRoutes"); // ✅ REQUIRED

// const app = express();

// /* =========================
//    MIDDLEWARE
// ========================= */
// app.use(cors());
// app.use(express.json());

// /* =========================
//    API ROUTES
// ========================= */
// app.use("/api/auth", authRoutes);
// app.use("/api/challenges", challengeRoutes);
// app.use("/api/ai-coach", aiCoachRoutes); // ✅ AI Coach
// app.use("/api/user", userRoutes);        // ✅ Profile + Goal update

// /* =========================
//    HEALTH CHECK (OPTIONAL)
// ========================= */
// app.get("/api/health", (req, res) => {
//   res.json({ status: "OK", service: "WellCare API" });
// });

// module.exports = app;





















// const express = require("express");
// const cors = require("cors");

// // ROUTES
// const authRoutes = require("./routes/authRoutes");
// const challengeRoutes = require("./routes/challengeRoutes");
// const aiCoachRoutes = require("./routes/aiCoachRoutes");
// const userRoutes = require("./routes/userRoutes");

// const app = express();

// /* =========================
//    MIDDLEWARE (FIXED CORS)
// ========================= */
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://wellcare2390.web.app",
//       "https://wellcare2390.firebaseapp.com",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// app.use(express.json());

// /* =========================
//    API ROUTES
// ========================= */
// app.use("/api/auth", authRoutes);
// app.use("/api/challenges", challengeRoutes);
// app.use("/api/ai-coach", aiCoachRoutes);
// app.use("/api/user", userRoutes);

// /* =========================
//    HEALTH CHECK
// ========================= */
// app.get("/api/health", (req, res) => {
//   res.json({ status: "OK", service: "WellCare API" });
// });

// module.exports = app;


























































const express = require("express");
const cors = require("cors");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const challengeRoutes = require("./routes/challengeRoutes");
const aiCoachRoutes = require("./routes/aiCoachRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

/* =========================
   MIDDLEWARE (CORS FIX)
========================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://wellcare2390.web.app",
      "https://wellcare2390.firebaseapp.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

/* =========================
   API ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/ai-coach", aiCoachRoutes);
app.use("/api/user", userRoutes);

/* =========================
   HEALTH CHECK
========================= */
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", service: "WellCare API" });
});

module.exports = app;
