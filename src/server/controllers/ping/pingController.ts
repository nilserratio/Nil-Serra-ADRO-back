import { type Request, type Response } from "express";

export const pingController = (req: Request, res: Response) => {
  res.status(200).json({ message: "Entered" });
};
