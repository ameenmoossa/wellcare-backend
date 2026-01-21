const express = require("express");
const router = express.Router();

const {
  getWorkoutCoachAdvice,
} = require("../controllers/aiCoachController");

router.post("/workout-coach", getWorkoutCoachAdvice);

module.exports = router;
