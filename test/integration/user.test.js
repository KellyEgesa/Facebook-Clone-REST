const { User } = require("../../models/User");
const request = require("supertest");
const bcrypt = require("bcrypt");

describe("/api/user", () => {
  let server;
  beforeEach(() => {
    server = require("../../index");
  });

  afterEach(async () => {
    await User.deleteMany({});
    await server.close();
  });

  describe("POST /create", () => {
    let email;
    let password;

    const exec = async () => {
      return await request(server).post("/api/user/create").send({
        email,
        password,
      });
    };

    beforeEach(() => {
      email = "trial.egesa@gmail.com";
      password = "trial1234";
    });

    afterEach(async () => {
      await User.deleteMany({});
      await server.close();
    });

    it("should validate the req.body inputs and return a status of 400 if invalid", async () => {
      email = "";
      password = "";

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return a status of 400 if email already exists", async () => {
      const secondExec = async () => {
        await exec();
        return await request(server).post("/api/user/create").send({
          email,
          password,
        });
      };

      const res = await secondExec();
      expect(res.status).toBe(400);
    });

    it("should return the saved user if successful", async () => {
      const res = await exec();
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("email");
    });
  });

  describe("POST /login", () => {
    let email;
    let password;

    const exec = async () => {
      return await request(server).post("/api/user/login").send({
        email,
        password,
      });
    };

    beforeEach(async () => {
      password = "trial1234";
      email = "trial.egesa@gmail.com";

      const salt = await bcrypt.genSalt(10);
      let hashPassword = await bcrypt.hash(password, salt);

      const user = new User({
        email,
        password: hashPassword,
      });
      await user.save();
    });

    afterEach(async () => {
      await User.deleteMany({});
      await server.close();
    });

    it("should validate the req.body inputs and return a status of 400 if invalid", async () => {
      email = "";
      password = "";

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return a status 0f 404 if email doesnt exist", async () => {
      email = "kelly@gmail.com";

      const res = await exec();
      expect(res.status).toBe(404);
    });

    it("should return a status 0f 400 if password is invalid", async () => {
      password = "wrong password";

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return a status 0f 200 if valid", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
  });

  describe("POST /resetPassword", () => {
    let email;

    const exec = async () => {
      return await request(server).post("/api/user/resetPassword").send({
        email,
      });
    };

    beforeEach(async () => {
      password = "trial1234";
      email = "trial.egesa@gmail.com";

      const salt = await bcrypt.genSalt(10);
      let hashPassword = await bcrypt.hash(password, salt);

      const user = new User({
        email,
        password: hashPassword,
      });
      await user.save();
    });

    afterEach(async () => {
      await User.deleteMany({});
      await server.close();
    });

    it("should validate the req.body inputs and return a status of 400 if invalid", async () => {
      email = "";

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return a status 0f 404 if email doesnt exist", async () => {
      email = "kelly@gmail.com";

      const res = await exec();
      expect(res.status).toBe(404);
    });

    it("should return a status 0f 200 if valid", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message", "Email sent with reset Url");
    });
  });

  describe("POST /reset/:id", () => {
    let link;
    let password;
    const exec = async () => {
      return await await request(server)
        .post(`/api/user/reset/${link}`)
        .send({ password });
    };

    beforeEach(async () => {
      link = "1234";
      password = "trial";
      let smallPassword = "trial1234";
      let email = "trial.egesa@gmail.com";

      const salt = await bcrypt.genSalt(10);
      let hashPassword = await bcrypt.hash(smallPassword, salt);

      const user = new User({
        email,
        password: hashPassword,
        resetPasswordToken: 1234,
        resetPasswordExpires: Date.now() + 3600000,
      });
      await user.save();
    });

    afterEach(async () => {
      await User.deleteMany({});
      await server.close();
    });

    it("should return a status 0f 400 if password link is invalid", async () => {
      link = "fakelink";

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return a status 0f 400 if password is not provided", async () => {
      password = "";

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return a user if succesful", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("email");
    });
  });
});
