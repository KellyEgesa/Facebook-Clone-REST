const { User } = require("../../../models/User");
const mongoose = require("mongoose");
const auth = require("../../../middleware/Auth");
const { JsonWebTokenError } = require("jsonwebtoken");
const { expectCt } = require("helmet");

describe("auth middleware", () => {
  it("should populate req.user with the payload of a valid jwt", () => {
    const user = {
      _id: mongoose.Types.ObjectId().toHexString(),
      email: "bartholomew.egesa@gmail.com",
    };

    const token = new User(user).generateAuthToken();
    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const res = {};
    const next = jest.fn();

    auth(req, res, next);
    expect(req.user).toMatchObject(user);
  });
});
