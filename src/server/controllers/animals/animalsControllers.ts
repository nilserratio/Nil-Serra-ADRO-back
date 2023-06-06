import { type Request, type NextFunction, type Response } from "express";
import Animal from "../../../database/models/Animal.js";
import CustomError from "../../../CustomError/CustomError.js";
import { statusCode } from "../../utils/responseData/responseData.js";

export const getAnimals = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const animals = await Animal.find().limit(10).exec();

    res.status(200).json({ animals });
  } catch (error) {
    next(error);
  }
};

export const removeAnimal = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const animal = await Animal.findByIdAndDelete(id).exec();

    if (!animal) {
      const error = new CustomError(statusCode.notFound, "Animal not found");

      throw error;
    }

    res
      .status(200)
      .json({ message: `Animal ${animal._id.toString()} removed` });
  } catch (error: unknown) {
    next(error);
  }
};
