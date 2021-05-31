const { User, loginUser, validateUser } = require("../models/User");
const express = require("express");
const bcrypt = require("bcrypt");

const { sendEmail } = require("../Common/Email");
const {
  Text: CreateText,
  Html: CreateHtml,
  Subject: CreateSubject,
} = require("../Common/Emails/Create");
const { Post } = require("../models/Post");

const router = express.Router();

async function braa() {
  let boom = await sendEmail(
    "bartholomew.egesa@gmail.com",
    CreateSubject,
    CreateText,
    CreateHtml
  );
  console.log(boom);
}
braa();

router.post("/create", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error)
    return res
      .status(400)
      .send({ message: error.details[0].message, status: "failed" });

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send({
      message: "User already exists try logging in",
      status: "failed",
    });

  let newUser = new User({
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  const savedUser = await newUser.save();

  //send email
  sendEmail(savedUser.email, CreateSubject, CreateText, CreateHtml);

  const token = newUser.generateAuthToken();
  return res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send({ _id: newUser._id, email: newUser.email });
});

router.post("/login", async (req, res) => {
  const { error } = loginUser(req.body);
  if (error)
    return res
      .status(400)
      .send({ message: error.details[0].message, status: "failed" });

  const user = await User.findOne({ email: req.body.email });

  if (!user)
    return res.status(404).send({
      message: "User doesnt exist, Kindly register first",
      status: "Not found",
    });

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword)
    return res.status(400).send({
      message: "Wrong password",
    });

  const posts = await Post.find({ postedBy: user._id });

  const token = user.generateAuthToken();

  const returnUser = await User.findOne({ email: req.body.email }).select(
    "-password"
  );

  return res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send({ user: returnUser, posts: posts });
});

router.post("/resetPassword", async (req, res) => {
  if (!req.body.email) {
    return res
      .status(400)
      .send({ message: "Email is required", status: "failed" });
  }
});

module.exports = router;
