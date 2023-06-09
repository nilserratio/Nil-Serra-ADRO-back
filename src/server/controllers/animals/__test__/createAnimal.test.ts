import { type Response } from "express";
import { createdAnimalMock } from "../../../../mocks/animals/animalsMocks";
import { type CustomRequest } from "../../../types";
import { statusCode } from "../../../utils/responseData/responseData";
import { createAnimal } from "../animalsControllers";
import Animal from "../../../../database/models/Animal";

type CustomResponse = Pick<Response, "status" | "json">;
type CustomRequestWithBody = Pick<CustomRequest, "userId" | "body">;

const res: CustomResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a createAnimal controler", () => {
  const req: CustomRequestWithBody = {
    userId: "64710077b5f9829cfe43b6a8",
    body: createdAnimalMock,
  };

  describe("When it recieve a request with an userId and a body", () => {
    test("Then it should call the response's method status with 200", async () => {
      Animal.create = jest.fn().mockResolvedValue(createdAnimalMock);

      const expectedStatusCode = statusCode.created;

      await createAnimal(req as CustomRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with the new created animal", async () => {
      Animal.create = jest.fn().mockResolvedValue(createdAnimalMock);

      const expectedResponseBody = createdAnimalMock;

      await createAnimal(req as CustomRequest, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ animal: expectedResponseBody });
    });
  });

  describe("When it receives a next function with an 'Validation Failed' error", () => {
    test("Then it should call next function with the 'Validation Failed' error", async () => {
      const expectedError = new Error("Validation Failed");

      Animal.create = jest.fn().mockRejectedValue(expectedError);

      await createAnimal(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
