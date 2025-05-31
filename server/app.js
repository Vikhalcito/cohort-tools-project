// IMPORTS
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const Cohort = require("./models/cohort.model.js");

const Students = require("./models/student.model.js");

const PORT = 5005;

// STATIC DATA - (you'll eventually remove this once DB is fully integrated)


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

//calling all students
app.get("/api/students", (req, res) => {

  Students.find()
  .then(response => {
    res.json(response)
  })
  .catch(error => res.status(500).json(error))
   // Later: replace with MongoDB find()
});

// calling students with specified cohort
app.get("/api/students/cohort/:cohortId", (req, res, next) =>{
  const {cohortId} = req.params
//encuentra los estudiantes que tengan como cohort al cohortId.
  Students.find(({ cohort: cohortId })).populate('cohort')  
  .then(response =>{
    res.json(response)
  })
  .catch(error => res.status(500).json(error))
})


// calling specified student
app.get("/api/students/:studentId", (req, res, next) =>{
  const {studentId} = req.params
  Students.findById(studentId)
  .then(response =>{
    res.json(response)
  })
  .catch(error => res.status(500).json(error))
})

//creating new student
app.post("/api/students", (req, res, next) =>{
    Students.create()
})
//updating specified student
app.put("/api/students/:studentId", (req, res, next) =>{
  const {studentId} = req.params
  const updatedStudent = req.body
  Students.findByIdAndUpdate(studentId, updatedStudent, {new: true})
})



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
    return Students.find()
  })

  .then((response) => {
    console.log(response)
    console.log("todo gucci")
  })

  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
  });

