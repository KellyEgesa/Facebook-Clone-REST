const { Post } = require("../../models/Post");
const { User } = require("../../models/User");
const request = require("supertest");
const mongoose = require("mongoose");

describe("/api/post", () => {
  let token;
  let server;
  beforeEach(() => {
    server = require("../../index");
    token = new User().generateAuthToken();
  });

  afterEach(async () => {
    await User.deleteMany({});
    await server.close();
  });

  describe("POST /create", () => {
    let description;
    const exec = () => {
      return request(server)
        .post("/api/post/create")
        .set("x-auth-token", token)
        .send({
          description,
        });
    };

    beforeEach(() => {
      description = "Just do it";
    });

    afterEach(async () => {
      await User.deleteMany({});
      await server.close();
    });

    it("should return a status of 400 if req.body is invalid", async () => {
      description = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return a status of 200 if valid", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
  });

  describe("GET /:id", () => {
    let id;
    const exec = () => {
      return request(server).get(`/api/post/${id}`).set("x-auth-token", token);
    };

    beforeEach(async () => {
      id = mongoose.Types.ObjectId().toHexString();

      const post = new Post({
        _id: id,
        description: "Just do it",
        postedBy: mongoose.Types.ObjectId().toHexString(),
      });
      await post.save();
    });

    it("should return a status of 404 if post doesnt exist", async () => {
      id = mongoose.Types.ObjectId().toHexString();
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it("should return the post if successful", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
  });
  describe("DELETE /:id", () => {
    let id;
    const exec = () => {
      return request(server)
        .delete(`/api/post/${id}`)
        .set("x-auth-token", token);
    };

    beforeEach(async () => {
      id = mongoose.Types.ObjectId().toHexString();
      const post = new Post({
        _id: id,
        description: "Just do it",
        postedBy: mongoose.Types.ObjectId().toHexString(),
      });
      await post.save();
    });

    it("should return a status of 404 if post doesnt exist", async () => {
      id = mongoose.Types.ObjectId().toHexString();
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it("should return the post if successful", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
  });
  describe("PUT /like/:id", () => {
    let id;

    const exec = () => {
      return request(server).put(`/api/post/${id}`).set("x-auth-token", token);
    };

    beforeEach(async () => {
      id = mongoose.Types.ObjectId().toHexString();
      const post = new Post({
        _id: id,
        description: "Just do it",
        postedBy: mongoose.Types.ObjectId().toHexString(),
      });
      await post.save();
    });

    it("should return a status of 404 if post doesnt exist", async () => {
      id = mongoose.Types.ObjectId().toHexString();
      const res = await exec();
      expect(res.status).toBe(404);
    });
  });
});
