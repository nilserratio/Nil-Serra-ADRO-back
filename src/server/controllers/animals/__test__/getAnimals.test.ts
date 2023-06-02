import { type Request, type Response } from "express";
import { type CustomResponse } from "../../../types.js";
import Animal from "../../../../database/models/Animal.js";
import { animalsMock } from "../../../../mocks/animals/animalsMocks.js";
import { getAnimals } from "../animalsControllers.js";
import { statusCode } from "../../../utils/responseData/responseData.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getAnimals controller", () => {
  const req = {};
  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receives a response", () => {
    Animal.find = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(animalsMock) });

    test("Then it should call the response's method status with 200", async () => {
      const expectedStatusCode = statusCode.ok;

      await getAnimals(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with a list of animals", async () => {
      const expectedResponseBody = {
        animals: animalsMock,
      };

      await getAnimals(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(expectedResponseBody);
    });
  });

  describe("When it receives a next function and the exec method rejects with an 'General Error' error", () => {
    test("Then it should call next function with the 'General Error' error", async () => {
      const expectedError = new TypeError(
        "Animal_1.default.find(...).limit is not a function]"
      );

      Animal.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await getAnimals(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
