// import modules
const express = require("express");
const route = express.Router();

const {
  validateCreatePost,
  validateCreateComment,
} = require("../middlewares/validateRequests");
const { fetchFeeds, createPost, createComment } = require("../controllers/");

route.get("/feeds", fetchFeeds);
route.post("/create-post", validateCreatePost, createPost);
route.post("/create-comment", validateCreateComment, createComment);

module.exports = route;
