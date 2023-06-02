import jwt from "jsonwebtoken";
import { auth } from "../authMiddleware.js";
import { type CustomRequest } from "../../../types.js";
import { type Request, type NextFunction, type Response } from "express";
import { tokenMock, tokenPayloadMock } from "../../../../mocks/userMocks.js";

describe("Given an auth middleware", () => {
  describe("When it recieve an authorization header with  a valid token and a next function", () => {
    test("Then it should call the recieved next function", () => {
      const req: Pick<Request, "header"> = {
        header: jest.fn().mockReturnValue(`Bearer ${tokenMock}`),
      };
      const res = {};
      const next = jest.fn();

      jwt.verify = jest.fn().mockReturnValue(tokenPayloadMock);

      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });
});
