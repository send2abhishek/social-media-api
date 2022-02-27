const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const PostLikes = require("../models/postLikes");

async function createBulKUser() {
  try {
    const resultCount = await User.count();

    if (resultCount === 0) {
      const result = await User.bulkCreate([
        {
          name: "Abhishek Kumar",
          email: "send2abhishek@live.com",
          city: "Bangalore",
          country: "India",
        },
        {
          name: "Aryan",
          email: "aryan@live.com",
          city: "Mumbai",
          country: "India",
        },
      ]);
      if (result && result.length > 0) {
        const userId = result[0].id;
        await Post.create(
          {
            title: "Looks like great day",
            content: "this is another awesome day with family",
            userId: userId,
            comments: [
              {
                comment: "good to see you guys",
                userId: userId + 1,
              },
            ],
            likes: [
              {
                userId: userId + 1,
              },
            ],
          },
          {
            include: [
              {
                model: Comment,
                as: "comments",
              },
              {
                model: PostLikes,
                as: "likes",
              },
            ],
          }
        );
      }
    }
  } catch (ex) {
    console.log("ex", ex);
    throw new Error(ex);
  }
}
createBulKUser();
module.exports = {
  createBulKUser,
};
