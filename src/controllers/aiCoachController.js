const { generateWorkoutAdvice } = require("../services/aiCoachService");

exports.getWorkoutCoachAdvice = async (req, res) => {
  try {
    const {
      day,
      workoutType,
      duration,
      intensity,
      gymAccess,
      streak,
      missedDays,
    } = req.body;

    // Basic validation
    if (!day || !workoutType || !duration || !intensity) {
      return res.status(400).json({
        success: false,
        message: "Missing workout data",
      });
    }

    const advice = await generateWorkoutAdvice({
      day,
      workoutType,
      duration,
      intensity,
      gymAccess,
      streak: streak || 0,
      missedDays: missedDays || 0,
    });

    return res.status(200).json({
      success: true,
      coachMessage: advice,
    });
  } catch (err) {
    console.error("AI Coach Error:", err.message || err);

    return res.status(500).json({
      success: false,
      message: "AI Coach failed",
    });
  }
};
