import jwt from "jsonwebtoken";
import { auth } from "../authMiddleware.js";
import { type CustomRequest } from "../../../types.js";
import { type Request, type NextFunction, type Response } from "express";
import { tokenMock, tokenPayloadMock } from "../../../../mocks/userMocks.js";
import CustomError from "../../../../CustomError/CustomError.js";
import {
  publicMessage,
  statusCode,
} from "../../../utils/responseData/responseData.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given an auth middleware", () => {
  const req: Pick<Request, "header"> = {
    header: jest.fn().mockReturnValue(`Bearer ${tokenMock}`),
  };
  const res = {};
  const next = jest.fn();

  describe("When it recieve a valid token inside an 'Authorization' header and a next function ", () => {
    test("Then it should call the recieved next function", () => {
      jwt.verify = jest.fn().mockReturnValue(tokenPayloadMock);

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it recieve an invalid token inside an 'Authorization' header and a next function ", () => {
    test("Then it should call the recieved next function with the error 401, 'Wrong Credentials'", () => {
      const expectedError = new CustomError(
        statusCode.unauthorized,
        "Invalid token",
        publicMessage.unauthorized
      );
      expectedError.name = "JsonWebTokenError";

      const req: Pick<Request, "header"> = {
        header: jest.fn().mockReturnValue("Wrong Bearer "),
      };

      jwt.verify = jest.fn().mockImplementation(() => {
        throw expectedError;
      });

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it recieve a header that not includes the 'Bearer' or the token and a next function ", () => {
    test("Then it should call the recieved next function with the error 401, 'Missing token'", () => {
      const expectedError = new CustomError(
        statusCode.unauthorized,
        "Missing token",
        publicMessage.unauthorized
      );

      const req: Pick<Request, "header"> = {
        header: jest.fn().mockReturnValue(""),
      };

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
