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

module.exports = router;
