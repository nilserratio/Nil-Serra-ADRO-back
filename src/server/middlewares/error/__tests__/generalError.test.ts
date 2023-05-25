import { type Response, type Request, type NextFunction } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import { generalError } from "../errorMiddlewares.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a generalError middlewware", () => {
  const req = {};

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it recieve a next function with a notFoundError CustomError and a response", () => {
    const statusCode = 404;
    const json = "Endpoint not found";
    const error = new CustomError(statusCode, json);
    const expectedErrorMessage = {
      message: json,
    };

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

  describe("When it recieve an error without status code and response", () => {
    const json = "General error, please try it in a few minutes";
    const error = new Error(json);

    test("Then it should call the response's method status with 500", () => {
      const statusCode = 500;

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });

    test("Then it should call the response's method json with a message 'General error, please try it in a few minutes'", () => {
      const expectedErrorMessage = {
        message: json,
      };

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });
});