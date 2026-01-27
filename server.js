// const dotenv = require("dotenv");
// dotenv.config();

// const app = require("./src/app");
// const connectDB = require("./src/config/db");

// connectDB();

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });




// 🔥 MUST be first
require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;

// 🧪 Debug (remove after confirmation)
console.log("JWT_SECRET loaded:", !!process.env.JWT_SECRET);

// 🚀 Start server only after DB connects
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
