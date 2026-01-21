







const { CHALLENGE_PLANS } = require("../utils/constants");

exports.getPlanByDay = (goal, day) => {
  if (!goal || !day) return null;

  const plans = CHALLENGE_PLANS[goal];
  if (!plans || plans.length === 0) return null;

  // 🔁 Rotate plans across 90 days
  const index = (day - 1) % plans.length;

  return plans[index];
};
