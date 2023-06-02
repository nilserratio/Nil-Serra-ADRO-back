import { type Request, type NextFunction, type Response } from "express";
import Animal from "../../../database/models/Animal.js";

export const getAnimals = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const animals = await Animal.find().exec();

    res.status(200);
    res.json({ animals });
  } catch (error: unknown) {
    next(error);
  }
};
