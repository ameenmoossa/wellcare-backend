


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

const authRoutes = require("./routes/authRoutes");
const challengeRoutes = require("./routes/challengeRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

/* =========================
   MIDDLEWARE
========================= */

// ✅ CORS – SAFE + RENDER FRIENDLY
app.use(
  cors({
    origin: function (origin, callback) {
      // allow server-to-server, Postman, Render health checks
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://wellcare2390.web.app",
        "https://wellcare2390.firebaseapp.com",
      ];

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ REQUIRED BODY PARSERS (FIXES req.body undefined)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/user", userRoutes);

/* =========================
   HEALTH CHECK
========================= */
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "WellCare API running 🚀",
  });
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err.message);
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
