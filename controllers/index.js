const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const PostLikes = require("../models/postLikes");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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

const createPost = async (req, res, next) => {
  try {
    const result = await Post.create(req.body);
    res.status(201).json({
      message: "post created",
      result,
    });
  } catch (ex) {
    res.status(500).json({
      error: ex.message,
    });
    next(ex);
  }
};

const createComment = async (req, res, next) => {
  try {
    const result = await Comment.create(req.body);
    res.status(201).json({
      message: "comment created",
      result,
    });
  } catch (ex) {
    res.status(500).json({
      error: ex.message,
    });
    next(ex);
  }
};

const createLike = async (req, res, next) => {
  try {
    const isExist = await isPostLikeExists(req.body.userId, req.body.postId);

    if (isExist) {
      const result = await PostLikes.destroy({
        where: {
          [Op.and]: [
            { userId: parseInt(req.body.userId) },
            {
              postId: parseInt(req.body.postId),
            },
          ],
        },
      });
      res.status(201).json({
        message: "post unliked",
        result,
      });
    } else {
      const result = await PostLikes.create(req.body);
      res.status(201).json({
        message: "post liked",
        result,
      });
    }
  } catch (ex) {
    res.status(500).json({
      error: ex.message,
    });
    next(ex);
  }
};

async function isPostLikeExists(userId, postId) {
  const result = await PostLikes.findOne({
    where: {
      [Op.and]: [
        { userId: parseInt(userId) },
        {
          postId: parseInt(postId),
        },
      ],
    },
  });

  return result;
}

module.exports = {
  fetchFeeds,
  createPost,
  createComment,
  createLike,
};
