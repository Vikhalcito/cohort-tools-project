// IMPORTS
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const Student = require("./server/models/student");

const PORT = 5005;

// STATIC DATA - (you'll eventually remove this once DB is fully integrated)
const students = require("./students.json");
const cohorts = require("./cohorts.json");

// INITIALIZE EXPRESS APP
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES
app.get("/docs", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "docs.html"));
});

app.get("/api/students", (req, res) => {
  res.json(students); // Later: replace with MongoDB find()
});

app.get("/api/cohorts", (req, res) => {
  res.json(cohorts); // Later: replace with MongoDB find()
});

// MONGODB CONNECTION
const MONGODB_URI = "mongodb://localhost:27017/cohort-tools-api";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");

   
    app.listen(PORT, () => {
      console.log(`✅ Server is running at http://localhost:${PORT}`);
    });
  })

  .then(() => {
    return students.find()
  })

  .then((response) => {
    console.log(response)
    console.log("todo gucci")
  })

  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
  });

