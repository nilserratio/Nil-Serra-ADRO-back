import { Schema, Types, model } from "mongoose";
import User from "./User";

const animalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  species: {
    type: String,
    required: true,
  },
  races: {
    type: [String],
  },
  user: {
    type: Types.ObjectId,
    ref: User,
    required: true,
  },
});

const Animal = model("Animal", animalSchema, "animals");

export default Animal;
