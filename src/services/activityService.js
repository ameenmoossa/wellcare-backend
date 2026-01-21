const ActivityLog = require("../models/ActivityLog");

exports.logActivity = async (userId, module, status) => {
  await ActivityLog.create({
    user: userId,
    module,
    status,
  });
};

exports.getActivities = async (userId) => {
  return ActivityLog.find({ user: userId }).sort({
    createdAt: -1,
  });
};
