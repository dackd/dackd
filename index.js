const express = require("express");
const path = require("path");
const connectDB = require("./config/database");
const urlRoutes = require("./routes/Url.route");
const { handle404 } = require("./controllers/Url.controller");
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", urlRoutes);

app.use(handle404);

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Application is ready to accept requests`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
