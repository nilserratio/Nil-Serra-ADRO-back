import "../../../loadEnvironment.js";
import request from "supertest";
import jwt from "jsonwebtoken";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../../app.js";
import { type UserData } from "../../types.js";
import { statusCode } from "../../utils/responseData/responseData.js";
import connectToDatabase from "../../../database/connectToDatabase.js";
import User from "../../../database/models/User.js";
import { mockUserHashed, mockedUser } from "../../mocks/userMocks.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Given a POST '/user/login' endpoint", () => {
  const loginPath = "/user/login";

  describe("When it recieves a request with name 'admin' and password 'admin'", () => {
    let newUser: UserData;

    beforeAll(async () => {
      newUser = await User.create(mockUserHashed);
    });

    test("Then it shoult return a status code 200 and a token", async () => {
      const expectedStatusCode = statusCode.ok;

      const response: { body: { token: string } } = await request(app)
        .post(loginPath)
        .send(mockedUser)
        .expect(expectedStatusCode);

      const payload = jwt.verify(response.body.token, process.env.JWT_SECRET!);
      const userId = payload.sub as string;

      expect(userId).toBe(newUser._id.toString());
    });
  });
});
