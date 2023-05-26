import { type Request, type Response } from "express";
import { statusCode } from "../../utils/responseData/responseData.js";

export const pingController = (req: Request, res: Response) => {
  res.status(statusCode.ok).json({ message: "Entered" });
};
