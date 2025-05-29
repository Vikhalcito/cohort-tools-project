// IMPORTS
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const PORT = 5005;

// STATIC DATA - Import JSON data
const students = require("./students.json");
const cohorts = require("./cohorts.json");


// INITIALIZE EXPRESS APP
const app = express();

// MIDDLEWARE
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON payloads
app.use(morgan("dev")); // Log HTTP requests
app.use(express.static("public")); // Serve static assets
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies

// ROUTES

// Route to serve the API documentation HTML file
app.get("/docs", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "docs.html"));
});

// Route to get all students
app.get("/api/students", (req, res) => {
  res.json(students);
});

// Route to get all cohorts
app.get("/api/cohorts", (req, res) => {
  res.json(cohorts);
});

// START SERVER
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
