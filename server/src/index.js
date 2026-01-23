const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");          // Express app
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Connect to MongoDB FIRST, then start server
const startServer = async () => {
  try {
    await connectDB(); // waits until MongoDB is connected
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1); // stop app if DB fails
  }
};

startServer();
