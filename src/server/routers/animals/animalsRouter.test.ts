import "../../../loadEnvironment.js";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../../database/connectToDatabase.js";
import Animal from "../../../database/models/Animal.js";
import { animalsMock } from "../../../mocks/animals/animalsMocks.js";
import app from "../../app.js";
import { paths } from "../../utils/paths/paths.js";
import { tokenMock } from "../../../mocks/user/userMocks.js";
import { statusCode } from "../../utils/responseData/responseData.js";

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
  await Animal.deleteMany();
});

const token = tokenMock;

describe("Given a GET '/animals' endpoint", () => {
  describe("When it recieve a request with a valid token", () => {
    beforeEach(async () => {
      await Animal.create(animalsMock);
    });

    test("Then it should return a statusCode 200 and a list of animals", async () => {
      const expectedStatusCode = statusCode.ok;

      const response = await request(app)
        .get(paths.animals)
        .set("Authorization", `Bearer ${token}`)
        .expect(expectedStatusCode);

      expect(response.body.animals).toHaveLength(2);
    });
  });

  describe("When it recieve a request with a not valid token", () => {
    test("Then it should return a statusCode 401 ", async () => {
      await request(app).get(paths.animals).expect(statusCode.unauthorized);
    });
  });
});
