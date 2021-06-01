const { User } = require("../../../models/User");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { jwtPrivateKey } = require("../../../secrets");

describe("user.generateAuthToken", () => {
  it("should generate a valid JWT", () => {
    const payload = {
      _id: mongoose.Types.ObjectId().toHexString(),
      email: "bartholomew.egesa@gmail.com",
    };
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, jwtPrivateKey);
    expect(decoded).toMatchObject(payload);
  });
});
