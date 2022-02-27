const { DataTypes } = require("sequelize");

const { sequelize } = require("../database");

const Comment = sequelize.define(
  "comment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
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

module.exports = Comment;
