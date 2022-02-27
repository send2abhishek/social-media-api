const { DataTypes } = require("sequelize");

const { sequelize } = require("../database");

const PostLikes = sequelize.define(
  "post_like",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
      references: {
        model: "user",
        key: "id",
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      field: "post_id",
      references: {
        model: "post",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

module.exports = PostLikes;
