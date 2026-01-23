const { getCoachInsight } = require("../services/aiCoachService");

exports.getAIInsight = async (req, res) => {
  try {
    const { intensity, duration } = req.body;

    // Fallback if auth user is missing
    const goal = req.user?.goal || "General fitness";

    const insight = await getCoachInsight({
      intensity,
      duration,
      goal,
    });

    if (!insight) {
      return res
        .status(503)
        .json({ message: "AI coach unavailable" });
    }

    res.status(200).json({ insight });
  } catch (err) {
    console.error("AI Coach Error:", err);
    res.status(500).json({ message: "AI coach unavailable" });
  }
};
