const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");
const PostLikes = require("./postLikes");

User.hasMany(Post, {
  foreignKey: {
    name: "userId",
    field: "user_id",
    allowNull: false,
  },
});

Comment.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
    field: "user_id",
  },
});

Post.hasMany(Comment, {
  foreignKey: {
    name: "postId",
    allowNull: false,
    field: "post_id",
  },
  as: "comments",
});

Post.hasMany(PostLikes, {
  foreignKey: {
    name: "postId",
    field: "post_id",
    allowNull: false,
  },
  as: "likes",
});

PostLikes.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
    field: "user_id",
  },
});
