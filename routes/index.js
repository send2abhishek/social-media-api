// import modules
const express = require("express");
const route = express.Router();

const {
  validateCreatePost,
  validateCreateComment,
  validateCreateLike,
} = require("../middlewares/validateRequests");
const {
  fetchFeeds,
  createPost,
  createComment,
  createLike,
} = require("../controllers/");

route.get("/feeds", fetchFeeds);
route.post("/create-post", validateCreatePost, createPost);
route.post("/create-comment", validateCreateComment, createComment);
route.post("/create-like", validateCreateLike, createLike);

module.exports = route;
