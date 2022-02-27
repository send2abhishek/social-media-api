const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const PostLikes = require("../models/postLikes");

const fetchFeeds = async (req, res, next) => {
  try {
    const results = await Post.findAll({
      order: [["updated_at", "DESC"]],
      attributes: ["id", "title", "content", "userId"],
      include: [
        {
          model: User,
          attributes: ["name", "email", "created_at"],
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["comment"],
          include: {
            model: User,
            attributes: ["name", "email", "created_at"],
          },
        },
        {
          model: PostLikes,
          as: "likes",
          attributes: ["postId"],
          include: {
            model: User,
            attributes: ["name", "email"],
          },
        },
      ],
    });
    res.status(201).send(results);
  } catch (ex) {
    next(ex);
  }
};

module.exports = {
  fetchFeeds,
};
