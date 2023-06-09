import { Joi } from "express-validation";
import { type AnimalStructure } from "../types.js";

export const createAnimalSchema = {
  body: Joi.object<AnimalStructure>({
    name: Joi.string().required(),
    species: Joi.string().required(),
    races: Joi.array().required(),
    gender: Joi.string().required(),
    size: Joi.string().required(),
    yearOfBirth: Joi.string().required(),
    imageUrl: Joi.string().required(),
    description: Joi.string().required(),
  }),
};
