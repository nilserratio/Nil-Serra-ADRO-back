import { Types } from "mongoose";
import { type AnimalDatabaseStructure } from "../types";

export const animalsMock: AnimalDatabaseStructure[] = [
  {
    name: "naiska",
    imageUrl: "naiska.png",
    size: "medium",
    description: "a naiska dog",
    dateOfBirth: "10/08/2015",
    sex: "female",
    species: "dog",
    races: ["border-collie"],
    user: new Types.ObjectId("64710077b5f9829cfe43b6c9"),
  },
  {
    name: "taco",
    imageUrl: "taco.png",
    size: "small",
    description: "a taco dog",
    dateOfBirth: "20/07/2022",
    sex: "male",
    species: "dog",
    races: ["dashund"],
    user: new Types.ObjectId("6471018db5f9829cfe43b6ca"),
  },
];
