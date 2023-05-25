import { type Response, type Request, type NextFunction } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import { generalError } from "../errorMiddlewares.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a generalError middlewware", () => {
  describe("When it recieve a next function with a notFoundError CustomError and a response", () => {
    const statusCode = 404;
    const json = "Endpoint not found";
    const error = new CustomError(statusCode, json);
    const expectedErrorMessage = {
      message: json,
    };

    const req = {};

    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    test("Then it should call the response's method with an status code 404", () => {
      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(error.statusCode);
    });

    test("Then it should call the response's json method with message 'Endpoint not found'", () => {
      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });
});
