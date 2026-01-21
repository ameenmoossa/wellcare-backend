




















// // ✅ LOAD ENV FIRST (VERY IMPORTANT)
// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");

// // ROUTES
// const authRoutes = require("./routes/authRoutes");
// const dashboardRoutes = require("./routes/dashboardRoutes");
// const activityRoutes = require("./routes/activityRoutes");
// const challengeRoutes = require("./routes/challengeRoutes");
// const aiCoachRoutes = require("./routes/aiCoachRoutes");

// const app = express();

// /* =========================
//    CORS CONFIG
// ========================= */
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// /* =========================
//    BODY PARSER
// ========================= */
// app.use(express.json());

// /* =========================
//    ROUTES
// ========================= */
// app.use("/api/auth", authRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/activity", activityRoutes);
// app.use("/api/challenge", challengeRoutes);
// app.use("/api/ai", aiCoachRoutes);

// /* =========================
//    HEALTH CHECK (OPTIONAL)
// ========================= */
// app.get("/", (req, res) => {
//   res.json({ success: true, message: "WellCare API running" });
// });

// module.exports = app;







































const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const activityRoutes = require("./routes/activityRoutes");
const challengeRoutes = require("./routes/challengeRoutes");
const aiCoachRoutes = require("./routes/aiCoachRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/challenge", challengeRoutes);
app.use("/api/ai", aiCoachRoutes);

module.exports = app;







