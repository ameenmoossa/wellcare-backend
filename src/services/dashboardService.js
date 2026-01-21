const DashboardStats = require("../models/DashboardStats");

exports.getStats = async (userId) => {
  const today = new Date().toDateString();

  let stats = await DashboardStats.findOne({ user: userId });

  if (!stats) {
    stats = await DashboardStats.create({
      user: userId,
      lastActive: today,
    });
  }

  if (stats.lastActive !== today) {
    stats.streak += 1;
    stats.activeDays += 1;
    stats.lastActive = today;
    await stats.save();
  }

  const modulesCount = stats.modulesDone.length;

  return {
    streak: stats.streak,
    activeDays: stats.activeDays,
    modulesDone: modulesCount,
    healthScore: Math.min(100, 60 + modulesCount * 8),
    goalPercent: Math.min(100, modulesCount * 20),
  };
};
