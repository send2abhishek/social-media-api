// import modules
const express = require("express");
const route = express.Router();

const {
  validateCreatePost,
  validateCreateComment,
  validateCreateLike,
  validatePostId,
} = require("../middlewares/validateRequests");
const {
  fetchFeeds,
  createPost,
  createComment,
  createLike,
  fetchPostById,
  fetchLikesByPostId,
  fetchCommentByPostId,
} = require("../controllers/");

route.get("/feeds", fetchFeeds);

route.post("/create-post", validateCreatePost, createPost);
route.post("/create-comment", validateCreateComment, createComment);
route.post("/create-like", validateCreateLike, createLike);

route.get("/fetch-post/:postId", validatePostId, fetchPostById);
route.get("/fetch-likes/:postId", validatePostId, fetchLikesByPostId);
route.get("/fetch-comments/:postId", validatePostId, fetchCommentByPostId);

module.exports = route;
