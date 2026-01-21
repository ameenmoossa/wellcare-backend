const activityService = require("../services/activityService");

/* =========================
   LOG ACTIVITY
========================= */
exports.logActivity = async (req, res, next) => {
  try {
    const { module, status } = req.body;

    if (!module || !status) {
      return res
        .status(400)
        .json({ message: "Module and status are required" });
    }

    await activityService.logActivity(
      req.user.id,
      module,
      status
    );

    res.status(200).json({
      success: true,
      message: "Activity logged",
    });
  } catch (err) {
    next(err);
  }
};

/* =========================
   GET USER ACTIVITIES
========================= */
exports.getActivities = async (req, res, next) => {
  try {
    const activities = await activityService.getActivities(
      req.user.id
    );

    res.status(200).json({
      success: true,
      activities,
    });
  } catch (err) {
    next(err);
  }
};
