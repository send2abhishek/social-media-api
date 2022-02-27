// import modules
const express = require("express");
const route = express.Router();

const { fetchFeeds } = require("../controllers/");

// const dimActivityController = require("../controllers/DataManagement/dimActivity");

// define all routes of web sever

// activity routes
route.get("/feeds", fetchFeeds);

module.exports = route;
