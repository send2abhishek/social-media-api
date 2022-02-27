// import modules
const express = require("express");
const route = express.Router();

const { validateCreatePost } = require("../middlewares/validateRequests");
const { fetchFeeds, createPost } = require("../controllers/");

route.get("/feeds", fetchFeeds);
route.post("/create-post", validateCreatePost, createPost);

module.exports = route;
