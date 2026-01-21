// const User = require("../models/User");
// const jwt = require("jsonwebtoken");

// /* =====================
//    JWT TOKEN
// ===================== */
// const signToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE || "7d",
//   });
// };

// /* =====================
//    REGISTER
// ===================== */
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     const existing = await User.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const user = await User.create({
//       name,
//       email,
//       password,
//       goal: null,
//       challengeStartDate: null,
//     });

//     const token = signToken(user._id);

//     res.status(201).json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         goal: user.goal,
//         challengeStartDate: user.challengeStartDate,
//       },
//     });
//   } catch (err) {
//     console.error("❌ REGISTER ERROR:", err);
//     res.status(500).json({ message: "Server error during registration" });
//   }
// };

// /* =====================
//    LOGIN  ✅ FIXED
// ===================== */
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user || user.password !== password) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const token = signToken(user._id);

//     // 🔥 CRITICAL FIX: SEND GOAL + START DATE
//     res.json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         goal: user.goal,
//         challengeStartDate: user.challengeStartDate,
//       },
//     });
//   } catch (err) {
//     console.error("❌ LOGIN ERROR:", err);
//     res.status(500).json({ message: "Server error during login" });
//   }
// };

// /* =====================
//    CHANGE PASSWORD
// ===================== */
// exports.changePassword = async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body;

//     if (!currentPassword || !newPassword) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     const user = await User.findById(req.user.id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (user.password !== currentPassword) {
//       return res
//         .status(401)
//         .json({ message: "Current password is incorrect" });
//     }

//     user.password = newPassword;
//     await user.save();

//     res.json({ message: "Password updated successfully" });
//   } catch (err) {
//     console.error("❌ CHANGE PASSWORD ERROR:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };












// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// /* =========================
//    REGISTER
// ========================= */
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const exists = await User.findOne({ email });
//     if (exists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashed = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashed,
//     });

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(201).json({ token, user });
//   } catch (err) {
//     res.status(500).json({ message: "Register failed" });
//   }
// };

// /* =========================
//    LOGIN
// ========================= */
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({ token, user });
//   } catch (err) {
//     res.status(500).json({ message: "Login failed" });
//   }
// };

// /* =========================
//    MAKE ADMIN (TEMP)
// ========================= */
// exports.makeAdmin = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.role = "admin";
//     await user.save();

//     res.json({
//       success: true,
//       message: `${email} is now admin`,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to make admin" });
//   }
// };






















const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* =========================
   🔐 REGISTER
========================= */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check existing user
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      goal: null,
      challengeStartDate: null,
    });

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Never send password
    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      goal: user.goal,
      challengeStartDate: user.challengeStartDate,
      createdAt: user.createdAt,
    };

    res.status(201).json({
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Register failed" });
  }
};

/* =========================
   🔑 LOGIN
========================= */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Never send password
    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      goal: user.goal,
      challengeStartDate: user.challengeStartDate,
      createdAt: user.createdAt,
    };

    res.json({
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Login failed" });
  }
};

/* =========================
   👑 MAKE ADMIN (TEMP / DEV)
========================= */
exports.makeAdmin = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = "admin";
    await user.save();

    res.json({
      success: true,
      message: `${email} is now admin`,
    });
  } catch (err) {
    console.error("MAKE ADMIN ERROR:", err);
    res.status(500).json({ message: "Failed to make admin" });
  }
};
