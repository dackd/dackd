const express = require("express");
const path = require("path");
const compression = require("compression");

const connectDB = require("./config/database");
const urlRoutes = require("./routes/Url.route");
const { handle404 } = require("./controllers/Url.controller");
require("dotenv").config();

const app = express();

// Security and SEO middleware
app.use((req, res, next) => {
  // Security headers
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=()"
  );

  // Remove powered by header
  res.removeHeader("X-Powered-By");

  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  compression({
    level: 6,
    threshold: 1024,
  })
);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

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
