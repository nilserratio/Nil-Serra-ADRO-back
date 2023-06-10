import { Schema, Types, model } from "mongoose";
import User from "./User.js";

const animalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  races: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  yearOfBirth: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: User,
    required: true,
  },
});

const Animal = model("Animal", animalSchema, "animals");

export default Animal;
