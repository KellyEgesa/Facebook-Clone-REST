const express = require("express");
const router = express.Router();
const auth = require("../middleware/Auth");
const { upload } = require("../middleware/Images.Js");
const { validatePost, Post } = require("../models/Post");

router.post("/create", auth, upload.single("postImage"), async (req, res) => {
  const { error } = validatePost(req.body);
  if (error)
    return res
      .status(400)
      .send({ message: error.details[0].message, status: "failed" });

  let newPost;

  if (req.file) {
    let filename = req.file.filename.split(".")[0];
    newPost = new Post({
      description: req.body.description,
      postedBy: req.user._id,
      postImage: "http://localhost:3000/api/images/" + filename,
    });
  } else {
    newPost = new Post({
      description: req.body.description,
      postedBy: req.user._id,
    });
  }

  await newPost.save();
  res.send(newPost);
});

router.get("/:id", auth, async (req, res) => {
  let post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).send({
      message: "Post doesnt exist",
      status: "Not found",
    });
  }
  return res.send(post);
});

router.delete("/:id", auth, async (req, res) => {
  let post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    return res.status(404).send({
      message: "Post doesnt exist",
      status: "Not found",
    });
  }
  return res.send(post);
});

router.put("/like/:id", auth, async (req, res) => {
  let post = await Post.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $inc: { likes: +1 },
    }
  );
  if (!post) {
    return res.status(404).send({
      message: "Post doesnt exist",
      status: "Not found",
    });
  }
  return res.send(post);
});

module.exports = router;
