// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     if (!process.env.JWT_SECRET) {
//       console.error("JWT_SECRET missing");
//       return res.status(500).json({ message: "Server misconfiguration" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       goal: null,
//       challengeStartDate: null,
//     });

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(201).json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         goal: user.goal,
//         challengeStartDate: user.challengeStartDate,
//       },
//     });
//   } catch (error) {
//     console.error("REGISTER ERROR:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         goal: user.goal,
//         challengeStartDate: user.challengeStartDate,
//       },
//     });
//   } catch (error) {
//     console.error("LOGIN ERROR:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = {
//   register,
//   login,
// };










// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// /* =====================
//    REGISTER
// ===================== */
// const register = async (req, res) => {
//   try {
//     console.log("REGISTER BODY:", req.body); // 🔍 debug log

//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({
//         message: "All fields are required",
//       });
//     }

//     const exists = await User.findOne({ email });
//     if (exists) {
//       return res.status(400).json({
//         message: "User already exists",
//       });
//     }

//     // ✅ ALWAYS force password to string (CRITICAL FIX)
//     const safePassword = String(password);

//     const hashedPassword = await bcrypt.hash(safePassword, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     // ✅ Ensure JWT_SECRET exists
//     if (!process.env.JWT_SECRET) {
//       throw new Error("JWT_SECRET is not defined");
//     }

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(201).json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (err) {
//     console.error("REGISTER ERROR:", err); // 🔥 SHOW REAL ERROR
//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// };

// /* =====================
//    LOGIN
// ===================== */
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         message: "Email and password required",
//       });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({
//         message: "Invalid credentials",
//       });
//     }

//     const isMatch = await bcrypt.compare(
//       String(password),
//       user.password
//     );

//     if (!isMatch) {
//       return res.status(400).json({
//         message: "Invalid credentials",
//       });
//     }

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (err) {
//     console.error("LOGIN ERROR:", err);
//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// };

// /* =====================
//    CHANGE PASSWORD
// ===================== */
// const changePassword = async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body;

//     if (!currentPassword || !newPassword) {
//       return res.status(400).json({
//         message: "All fields are required",
//       });
//     }

//     const user = await User.findById(req.user._id);
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     const isMatch = await bcrypt.compare(
//       String(currentPassword),
//       user.password
//     );

//     if (!isMatch) {
//       return res.status(400).json({
//         message: "Current password incorrect",
//       });
//     }

//     user.password = await bcrypt.hash(String(newPassword), 10);
//     await user.save();

//     res.json({
//       message: "Password updated successfully",
//     });
//   } catch (err) {
//     console.error("CHANGE PASSWORD ERROR:", err);
//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// };

// /* =====================
//    EXPORTS
// ===================== */
// module.exports = {
//   register,
//   login,
//   changePassword,
// };




const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* =====================
   REGISTER
===================== */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2️⃣ Validate ENV early (🔥 IMPORTANT)
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET missing");
      return res.status(500).json({
        message: "Server configuration error",
      });
    }

    // 3️⃣ Check existing user
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // 4️⃣ Hash password safely
    const hashedPassword = await bcrypt.hash(String(password), 10);

    // 5️⃣ Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 6️⃣ Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 7️⃣ Send response
    return res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/* =====================
   LOGIN
===================== */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "Server configuration error",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      String(password),
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/* =====================
   CHANGE PASSWORD
===================== */
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findById(req.user._id).select("+password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      String(currentPassword),
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password incorrect",
      });
    }

    user.password = await bcrypt.hash(String(newPassword), 10);
    await user.save();

    return res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error("CHANGE PASSWORD ERROR:", err.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  register,
  login,
  changePassword,
};
