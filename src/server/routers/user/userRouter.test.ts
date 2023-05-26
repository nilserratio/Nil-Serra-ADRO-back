import "../../../loadEnvironment.js";
import request from "supertest";
import jwt from "jsonwebtoken";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../../app.js";
import { type UserData } from "../../types.js";
import {
  privateMessage,
  statusCode,
} from "../../utils/responseData/responseData.js";
import connectToDatabase from "../../../database/connectToDatabase.js";
import User from "../../../database/models/User.js";
import {
  badRequestMockedUser,
  mockUserHashed,
  mockedUser,
  unauthorizedMockedUser,
} from "../../../mocks/userMocks.js";

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

  describe("When it recieves a request with username 'admin' and password 'admin'", () => {
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

  describe("When it recieve a request with wrong credentials with username 'wrongAdmin' and password 'wrongAdmin'", () => {
    test("Then it should return a status code 401 and 'Wrong Credentials' error message", async () => {
      const expectedStatusCode = statusCode.unauthorized;
      const expectedMessage = privateMessage.unauthorized;

      const response = await request(app)
        .post(loginPath)
        .send(unauthorizedMockedUser)
        .expect(expectedStatusCode);

      expect(response.body.message).toBe(expectedMessage);
    });
  });

  describe("When it recieve a request with the password on a wrong format, like a number", () => {
    test("Then it shoud return a status code 400 and 'Validation Failed' error message", async () => {
      const expectedStatusCode = statusCode.badRequest;
      const expectedMessage = privateMessage.badRequest;

      const response = await request(app)
        .post(loginPath)
        .send(badRequestMockedUser)
        .expect(expectedStatusCode);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});
