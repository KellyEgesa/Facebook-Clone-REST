const express = require("express");
const cors = require("cors");

const User = require("../route/User");
const Image = require("../route/Images");
const Post = require("../route/Post");

module.exports = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/post", Post);
  app.use("/api/user", User);
  app.use("/api/images", Image);
};
