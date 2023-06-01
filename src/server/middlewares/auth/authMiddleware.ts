import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../../../CustomError/CustomError.js";
import {
  privateMessage,
  publicMessage,
  statusCode,
} from "../../utils/responseData/responseData.js";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader?.includes("Bearer")) {
      const error = new CustomError(
        statusCode.unauthorized,
        privateMessage.unauthorized,
        publicMessage.unauthorized
      );

      throw error;
    }

    const token = authorizationHeader.replace("Bearer ", "");

    jwt.verify(token, process.env.JWT_SECRET!);

    next();
  } catch (error: unknown) {
    const customError =
      (error as Error).name === "JsonWebTokenError"
        ? new CustomError(
            statusCode.unauthorized,
            privateMessage.unauthorized,
            publicMessage.unauthorized
          )
        : error;
    next(customError);
  }
};
