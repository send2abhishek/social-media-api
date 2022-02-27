// import modules
const express = require("express");
const route = express.Router();

// const validateInputs = require("../middlewares/validateInputs");

// const dimActivityController = require("../controllers/DataManagement/dimActivity");

// define all routes of web sever

// activity routes
route.get("/test", (req, res) => {
  res.status(200).send("this is working");
});

module.exports = route;
