const mongoose = require("mongoose");
require("dotenv").config();

const mongoDbUrl = `mongodb+srv://dackd:${process.env.MONGODB_PASSWORD}@urlshorten.t4jco8b.mongodb.net/?retryWrites=true&w=majority&appName=URLShorten`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // Re-throw error to be handled by caller
  }
};

// MongoDB connection event listeners
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB error:", error);
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

module.exports = connectDB;
