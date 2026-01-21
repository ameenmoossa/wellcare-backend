const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");

const {
  getAdminUsers,
  setGoal,
  adminResetUserPassword,
} = require("../controllers/dashboardController");

/* ADMIN ROUTES */
router.get("/admin/users", protect, adminOnly, getAdminUsers);
router.post(
  "/admin/reset-password",
  protect,
  adminOnly,
  adminResetUserPassword
);

/* USER ROUTES */
router.put("/set-goal", protect, setGoal);

module.exports = router;
