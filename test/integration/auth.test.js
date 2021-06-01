const { User } = require("../../models/User");
const request = require("supertest");

describe("auth middleware", () => {
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

  const exec = () => {
    return request(server)
      .post("/api/post/create")
      .set("x-auth-token", token)
      .send({
        description: "Just Do It",
      });
  };

  it("should return a status of 401 if no x-auth-token is provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return a status of 400 if x-auth-token is invalid", async () => {
    token = "fakeToken";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return a status of 200 if x-auth-token is valid", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
