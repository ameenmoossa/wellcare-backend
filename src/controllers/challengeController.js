

// const challengeService = require("../services/challengeService");

// exports.getTodayChallenge = (req, res) => {
//   try {
//     const { startDate, goal } = req.query;

//     if (!startDate || !goal) {
//       return res.status(400).json({
//         success: false,
//         message: "Start date and goal required",
//       });
//     }

//     const data = challengeService.getTodayPlan(startDate, goal);

//     if (!data) {
//       return res.status(200).json({
//         success: true,
//         day: null,
//         plan: null,
//       });
//     }

//     res.status(200).json({
//       success: true,
//       day: data.day,
//       plan: data.plan,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to generate daily challenge",
//     });
//   }
// };













// const challengeService = require("../services/challengeService");

// exports.getTodayChallenge = async (req, res) => {
//   const user = req.user;

//   if (!user?.goal || !user?.currentChallengeDay) {
//     return res.json({
//       success: true,
//       day: null,
//       plan: null,
//     });
//   }

//   const day = user.currentChallengeDay;

//   const plan = challengeService.getPlanByDay(
//     user.goal,
//     day
//   );

//   if (!plan) {
//     return res.json({
//       success: true,
//       day,
//       plan: null,
//     });
//   }

//   res.json({
//     success: true,
//     day,
//     plan,
//   });
// };

// exports.completeTodayChallenge = async (req, res) => {
//   const user = req.user;
//   const day = user.currentChallengeDay;

//   user.challengeProgress.set(String(day), true);

//   if (day < 90) {
//     user.currentChallengeDay += 1;
//   }

//   await user.save();

//   res.json({
//     success: true,
//     nextDay: user.currentChallengeDay,
//   });
// };












































const challengeService = require("../services/challengeService");

/* =========================
   GET TODAY CHALLENGE
========================= */
exports.getTodayChallenge = async (req, res) => {
  try {
    const user = req.user;
    const { startDate, goal } = req.query;

    if (!goal || !startDate) {
      return res.json({
        success: true,
        day: null,
        plan: null,
      });
    }

    // ✅ Calculate challenge day dynamically
    const start = new Date(startDate);
    const today = new Date();

    start.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const day =
      Math.floor((today - start) / (1000 * 60 * 60 * 24)) + 1;

    if (day < 1 || day > 90) {
      return res.json({
        success: true,
        day: null,
        plan: null,
      });
    }

    const plan = challengeService.getPlanByDay(goal, day);

    if (!plan) {
      return res.json({
        success: true,
        day,
        plan: null,
      });
    }

    res.json({
      success: true,
      day,
      plan,
    });
  } catch (err) {
    console.error("GET TODAY CHALLENGE ERROR:", err);
    res.status(500).json({ success: false });
  }
};

/* =========================
   COMPLETE TODAY CHALLENGE
========================= */
exports.completeTodayChallenge = async (req, res) => {
  try {
    const user = req.user;

    if (!user.challengeProgress) {
      user.challengeProgress = new Map();
    }

    const { startDate } = req.body;

    const start = new Date(startDate);
    const today = new Date();

    start.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const day =
      Math.floor((today - start) / (1000 * 60 * 60 * 24)) + 1;

    user.challengeProgress.set(String(day), true);
    await user.save();

    res.json({
      success: true,
      completedDay: day,
    });
  } catch (err) {
    console.error("COMPLETE CHALLENGE ERROR:", err);
    res.status(500).json({ success: false });
  }
};
