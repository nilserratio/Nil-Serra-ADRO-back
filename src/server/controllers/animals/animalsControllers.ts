import { type Request, type NextFunction, type Response } from "express";
import { Types } from "mongoose";
import Animal from "../../../database/models/Animal.js";
import CustomError from "../../../CustomError/CustomError.js";
import {
  privateMessage,
  statusCode,
} from "../../utils/responseData/responseData.js";
import { type CustomRequest } from "../../types.js";

export const getAnimals = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const limit = Number(req.query.limit);
  const skip = Number(req.query.skip);

  try {
    const animals = await Animal.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const totalAnimals = await Animal.where().countDocuments();

    res.status(200).json({ animals, totalAnimals });
  } catch (error) {
    next(error);
  }
};

export const removeAnimal = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idAnimal } = req.params;

    const animal = await Animal.findByIdAndDelete(idAnimal).exec();

    if (!animal) {
      const error = new CustomError(statusCode.notFound, "Animal not found");

      throw error;
    }

    res.status(200).json({ message: "Animal removed" });
  } catch (error: unknown) {
    next(error);
  }
};

export const createAnimal = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req;
    const createAnimal = req.body;

    const newAnimal = await Animal.create({
      ...createAnimal,
      user: new Types.ObjectId(userId),
    });

    if (!newAnimal) {
      const error = new CustomError(
        statusCode.badRequest,
        privateMessage.badRequest
      );

      throw error;
    }

    res.status(statusCode.created).json({ animal: newAnimal });
  } catch (error) {
    next(error);
  }
};

export const getAnimalById = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idAnimal } = req.params;

    const animalById = await Animal.findById(idAnimal).exec();

    if (!animalById) {
      const error = new CustomError(statusCode.notFound, "Animal not found");

      throw error;
    }

    res.status(200).json({ animalById });
  } catch (error) {
    next(error);
  }
};
