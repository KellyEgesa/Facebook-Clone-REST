const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { jwtPrivateKey } = require("../secrets");

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    unique: true,
    type: String,
    minLength: 3,
    maxLength: 64,
    trim: true,
  },
  password: {
    required: true,
    type: String,
    minLength: 8,
    maxLength: 64,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, email: this.email }, jwtPrivateKey);
  return token;
};

const User = mongoose.model("User", userSchema);

let validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().min(3).max(64).required(),
    password: Joi.string().min(8).max(64).required(),
  });
  return schema.validate(user);
};

let loginUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().min(3).max(64).required(),
    password: Joi.string().min(8).max(64),
  });
  return schema.validate(user);
};

module.exports.User = User;
module.exports.validateUser = validateUser;
module.exports.loginUser = loginUser;
