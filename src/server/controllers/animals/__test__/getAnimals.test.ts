import { type Response } from "express";
import {
  type CustomRequestQuerys,
  type CustomResponse,
} from "../../../types.js";
import Animal from "../../../../database/models/Animal.js";
import { animalsMock } from "../../../../mocks/animals/animalsMocks.js";
import { getAnimals } from "../animalsControllers.js";
import { statusCode } from "../../../utils/responseData/responseData.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getAnimals controller", () => {
  const req: Pick<CustomRequestQuerys, "query"> = {
    query: {
      limit: "10",
      skip: "5",
    },
  };
  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receives a response", () => {
    Animal.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(animalsMock),
    });

    Animal.where = jest.fn().mockReturnValue({
      countDocuments: jest.fn().mockReturnValue(animalsMock.length),
    });

    test("Then it should call the response's method status with 200", async () => {
      const expectedStatusCode = statusCode.ok;

      await getAnimals(req as CustomRequestQuerys, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with a list of animals", async () => {
      const expectedResponseBody = {
        animals: animalsMock,
        totalAnimals: animalsMock.length,
      };

      await getAnimals(req as CustomRequestQuerys, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(expectedResponseBody);
    });
  });

  describe("When it receives a next function and the exec method rejects with an 'General Error' error", () => {
    test("Then it should call next function with the 'General Error' error", async () => {
      const expectedError = new TypeError(
        "Animal_js_1.default.find(...).limit is not a function"
      );

      Animal.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await getAnimals(req as CustomRequestQuerys, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
