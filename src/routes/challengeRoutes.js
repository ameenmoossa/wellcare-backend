





const express = require("express");
const router = express.Router();

const {
  getTodayChallenge,
  completeTodayChallenge,
} = require("../controllers/challengeController");

const { protect } = require("../middleware/authMiddleware");

/* =========================
   GET TODAY CHALLENGE
========================= */
router.get("/today", protect, getTodayChallenge);

/* =========================
   COMPLETE TODAY CHALLENGE
========================= */
router.post("/complete", protect, completeTodayChallenge);

module.exports = router;




