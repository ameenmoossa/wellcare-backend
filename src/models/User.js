
// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   role: { type: String, default: "user" },

//   // ✅ ADD THESE
//   goal: { type: String, default: null },
//   challengeStartDate: { type: Date, default: null },
// });

// module.exports = mongoose.model("User", userSchema);








// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user",
//     },
//     goal: {
//       type: String,
//       default: null,
//     },
//     challengeStartDate: {
//       type: Date,
//       default: null,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);






const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },

    // ✅ REQUIRED FOR PROFILE + CHALLENGES
    goal: { type: String },
    challengeStartDate: { type: Date },
    currentChallengeDay: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
