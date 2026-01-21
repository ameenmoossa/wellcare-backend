// const User = require("../models/User");

// /* =========================
//    ADMIN: GET USERS
// ========================= */
// exports.getAdminUsers = async (req, res) => {
//   try {
//     const users = await User.find().select(
//       "name email goal role createdAt"
//     );

//     res.json({ users });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch users" });
//   }
// };

// /* =========================
//    USER: SET GOAL (FIXED)
// ========================= */
// exports.setGoal = async (req, res) => {
//   try {
//     const user = req.user; // from auth middleware
//     const { goal } = req.body;

//     if (!goal) {
//       return res.status(400).json({
//         message: "Goal is required",
//       });
//     }

//     // ✅ detect if goal actually changed
//     const goalChanged = user.goal !== goal;

//     // update goal
//     user.goal = goal;

//     // 🔥 RESET challenge when goal changes
//     if (goalChanged) {
//       user.challengeStartDate = new Date();
//       user.currentChallengeDay = 1;
//       user.challengeProgress = {};
//     }

//     await user.save();

//     res.json({
//       success: true,
//       user,
//     });
//   } catch (err) {
//     console.error("SET GOAL ERROR:", err);
//     res.status(500).json({
//       message: "Failed to set goal",
//     });
//   }
// };








const User = require("../models/User");
const bcrypt = require("bcryptjs");

/* =========================
   ADMIN: GET USERS
========================= */
exports.getAdminUsers = async (req, res) => {
  try {
    const users = await User.find().select(
      "name email goal role createdAt"
    );
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/* =========================
   USER: SET GOAL
========================= */
exports.setGoal = async (req, res) => {
  try {
    const user = req.user;
    const { goal } = req.body;

    if (!goal) {
      return res.status(400).json({ message: "Goal is required" });
    }

    const goalChanged = user.goal !== goal;
    user.goal = goal;

    if (goalChanged) {
      user.challengeStartDate = new Date();
      user.currentChallengeDay = 1;
      user.challengeProgress = {};
    }

    await user.save();

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: "Failed to set goal" });
  }
};

/* =========================
   ADMIN: RESET USER PASSWORD
========================= */
exports.adminResetUserPassword = async (req, res) => {
  try {
    const { userId, newPassword } = req.body;

    if (!userId || !newPassword) {
      return res
        .status(400)
        .json({ message: "User ID and new password required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to reset password" });
  }
};
