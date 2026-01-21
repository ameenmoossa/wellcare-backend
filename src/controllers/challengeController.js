

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













const challengeService = require("../services/challengeService");

exports.getTodayChallenge = async (req, res) => {
  const user = req.user;

  if (!user?.goal || !user?.currentChallengeDay) {
    return res.json({
      success: true,
      day: null,
      plan: null,
    });
  }

  const day = user.currentChallengeDay;

  const plan = challengeService.getPlanByDay(
    user.goal,
    day
  );

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
};

exports.completeTodayChallenge = async (req, res) => {
  const user = req.user;
  const day = user.currentChallengeDay;

  user.challengeProgress.set(String(day), true);

  if (day < 90) {
    user.currentChallengeDay += 1;
  }

  await user.save();

  res.json({
    success: true,
    nextDay: user.currentChallengeDay,
  });
};
