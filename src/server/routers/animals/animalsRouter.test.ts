import "../../../loadEnvironment.js";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../../database/connectToDatabase.js";
import Animal from "../../../database/models/Animal.js";
import {
  animalsByIdMock,
  animalsMock,
  createdAnimalMock,
} from "../../../mocks/animals/animalsMocks.js";
import app from "../../app.js";
import { paths } from "../../utils/paths/paths.js";
import {
  tokenMock,
  unauthorizedMockedUser,
} from "../../../mocks/user/userMocks.js";
import {
  privateMessage,
  statusCode,
} from "../../utils/responseData/responseData.js";

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

beforeEach(() => {
  jest.clearAllMocks();
});

beforeEach(async () => {
  await Animal.create(animalsMock);
});

describe("Given a GET '/animals' endpoint", () => {
  describe("When it recieve a request with a valid token", () => {
    test("Then it should return a statusCode 200 and a list of animals", async () => {
      const expectedStatusCode = statusCode.ok;

      const response = await request(app)
        .get(paths.animals)
        .set("Authorization", `Bearer ${token}`)
        .expect(expectedStatusCode);

      expect(response.body.animals).toHaveLength(2);
    });
  });
});

describe("Given a DELETE '/:idAnimal' endpoint", () => {
  describe("When it recieve a request with an idAnimal and a valid token", () => {
    test("Then it should return a statusCode 200 and the message 'Animal removed'", async () => {
      const expectedStatusCode = statusCode.ok;
      const expectedMessage = "Animal removed";

      const response = await request(app)
        .delete(`${paths.animals}/${animalsMock[0]._id.toString()}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(expectedStatusCode);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});

describe("Given a POST '/create' endpoint", () => {
  describe("When it recieve a request with an idAnimal and a new animal data named 'naiska'", () => {
    test("Then it should return a statusCode 200 and the new animal with name 'naiska'", async () => {
      const expectedStatusCode = statusCode.created;
      const expectedAnimalName = "naiska";

      const response = await request(app)
        .post(`${paths.animals}/create`)
        .set("Authorization", `Bearer ${token}`)
        .send(createdAnimalMock)
        .expect(expectedStatusCode);

      expect(response.body.animal.name).toBe(expectedAnimalName);
    });
  });

  describe("When it recieve a request with an idAnimal and a new animal data named 'naiska' but the user is not logged in", () => {
    test("Then it should return a status code 401 and 'Invalid token' error message", async () => {
      const expectedStatusCode = statusCode.unauthorized;
      const expectedMessage = "Invalid token";

      const response = await request(app)
        .post(`${paths.animals}/create`)
        .set("Authorization", `Bearer ${unauthorizedMockedUser.password}`)
        .send(createdAnimalMock)
        .expect(expectedStatusCode);

      expect(response.body.message).toBe(expectedMessage);
    });
  });

  describe("When it recieve a request with an idAnimal and a new animal data named 'naiska' but with an extra property", () => {
    test("Then it shoud return a status code 400 and 'Validation Failed' error message", async () => {
      const expectedStatusCode = statusCode.badRequest;
      const expectedMessage = privateMessage.badRequest;

      const response = await request(app)
        .post(`${paths.animals}/create`)
        .set("Authorization", `Bearer ${token}`)
        .send({ ...createdAnimalMock, color: "brown" })
        .expect(expectedStatusCode);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});

describe("Given a GET '/:idAnimal' endpoint", () => {
  describe("When it recieve a request with an idAnimal", () => {
    test("Then it should return a statusCode 200 and the animal", async () => {
      const expectedStatusCode = statusCode.ok;

      const response = await request(app)
        .get(`${paths.animals}/${animalsMock[0]._id.toString()}`)
        .expect(expectedStatusCode);

      expect(response.body.animalById).toStrictEqual(animalsByIdMock[0]);
    });
  });
});
