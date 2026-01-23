const User = require("../models/User");

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, goal } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (goal) {
      user.goal = goal;

      // reset challenge when goal changes
      user.challengeStartDate = new Date();
      user.currentChallengeDay = 1;
    }

    await user.save();

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        goal: user.goal,
        challengeStartDate: user.challengeStartDate,
      },
    });
  } catch (err) {
    console.error("PROFILE UPDATE ERROR:", err);
    res.status(500).json({ message: "Profile update failed" });
  }
};
