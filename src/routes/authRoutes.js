const express = require("express");
const router = express.Router();

const {
  register,
  login,
} = require("../controllers/authController"); // ✅ MUST BE SINGULAR

router.post("/register", register);
router.post("/login", login);

module.exports = router;
