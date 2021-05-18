const mongoose = require("mongoose");
const Joi = require("joi");

const postSchema = new mongoose.Schema({
  createdAt: {
    required: true,
    default: Date.now(),
    type: Date,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    minLength: 3,
    maxLength: 1026,
    required: true,
  },
  postImage: {
    type: String,
    minLength: 3,
    maxLength: 1026,
  },
  likes: {
    type: Number,
    default: 0,
    min: 0,
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);

let validatePost = (post) => {
  const schema = Joi.object({
    description: Joi.string().min(3).max(1024).required(),
  });
  return schema.validate(post);
};

module.exports.Post = Post;
module.exports.validatePost = validatePost;
