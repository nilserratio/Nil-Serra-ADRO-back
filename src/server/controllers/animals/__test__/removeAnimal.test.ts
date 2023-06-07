import { type Response } from "express";
import { type CustomParamsRequest, type CustomRequest } from "../../../types";
import { animalsMock } from "../../../../mocks/animals/animalsMocks";
import Animal from "../../../../database/models/Animal";
import { removeAnimal } from "../animalsControllers";
import { statusCode } from "../../../utils/responseData/responseData";
import CustomError from "../../../../CustomError/CustomError";

type CustomResponse = Pick<Response, "status" | "json">;
type CustomRequestWithParams = Pick<CustomRequest, "params">;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a removeAnimal controller", () => {
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

    Animal.findByIdAndDelete = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(animalMock) });

    test("Then it should call the response's method status code with 200", async () => {
      await removeAnimal(req as CustomParamsRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode.ok);
    });

    test(`Then it should call the response's method json with a message 'Animal ${req.params.idAnimal} removed'`, async () => {
      const expectedMessage = `Animal ${req.params.idAnimal} removed`;

      await removeAnimal(req as CustomParamsRequest, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });

  describe("When it receives a next function and the animal doesn't exist", () => {
    test("Then it should call next with a 'Animal not found' error", async () => {
      Animal.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      const expectedError = new CustomError(
        statusCode.notFound,
        "Animal not found"
      );

      await removeAnimal(req as CustomParamsRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
