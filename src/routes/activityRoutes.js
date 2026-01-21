const express = require("express");
const router = express.Router();

const activityController = require("../controllers/activityController");
const { protect } = require("../middleware/authMiddleware");

/* =========================
   ACTIVITY ROUTES
========================= */
router.post(
  "/",
  protect,
  activityController.logActivity
);

router.get(
  "/",
  protect,
  activityController.getActivities
);

module.exports = router;
