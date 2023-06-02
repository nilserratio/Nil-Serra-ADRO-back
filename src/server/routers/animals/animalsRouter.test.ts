import "../../../loadEnvironment.js";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../../database/connectToDatabase";
import mongoose from "mongoose";
import Animal from "../../../database/models/Animal";
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

describe("Given a GET '/animals' endpoint", () => {
  beforeEach(async () => {
    await Animal.create(animalsMock);
  });

  describe("When it recieve a request with a valid token", () => {
    test("Then it should return a statusCode 200 and a list of animals", async () => {
      const response = await request(app)
        .get(paths.animals)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(statusCode.ok);

      expect(response.body.animals).toHaveLength(2);
    });
  });

  describe("When it recieve a request with a not valid token", () => {
    test("Then it should return a statusCode 401 ", async () => {
      await request(app).get(paths.animals).expect(statusCode.unauthorized);
    });
  });
});
