import { type Response } from "express";
import { type CustomRequest } from "../../../types";
import { animalsMock } from "../../../../mocks/animals/animalsMocks";
import Animal from "../../../../database/models/Animal";
import { getAnimalById } from "../animalsControllers";
import { statusCode } from "../../../utils/responseData/responseData";
import CustomError from "../../../../CustomError/CustomError";

type CustomResponse = Pick<Response, "status" | "json">;
type CustomRequestWithParams = Pick<CustomRequest, "params">;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getAnimalById controller", () => {
  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  const req: CustomRequestWithParams = {
    params: {
      idAnimal: animalsMock[0]._id.toString(),
    },
  };

  describe("When it recieve a response and the animal exist", () => {
    const animalMock = animalsMock[0];

    Animal.findById = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(animalMock) });

    test("Then it should call the response's method status code with 200", async () => {
      await getAnimalById(req as CustomRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode.ok);
    });

    test("Then it should call the response's method json with the animal", async () => {
      await getAnimalById(req as CustomRequest, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ animalById: animalsMock[0] });
    });
  });

  describe("When it receives a next function and the animal doesn't exist", () => {
    test("Then it should call next function with a 'Animal not found' error", async () => {
      const expectedError = new CustomError(
        statusCode.notFound,
        "Animal not found"
      );

      Animal.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await getAnimalById(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
