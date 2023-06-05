import { Types } from "mongoose";
import { type AnimalDataStructure } from "../../types";

export const animalsMock: AnimalDataStructure[] = [
  {
    _id: new Types.ObjectId("64710077b5f9829cfe43b6d9"),
    name: "naiska",
    imageUrl: "naiska.png",
    size: "Medium Size",
    description: "a naiska dog",
    yearOfBirth: "10/08/2015",
    gender: "Female",
    species: "dog",
    races: ["border-collie"],
    user: new Types.ObjectId("64710077b5f9829cfe43b6c9"),
  },
  {
    _id: new Types.ObjectId("64710077b5f9829cfe43b6a9"),
    name: "taco",
    imageUrl: "taco.png",
    size: "Small Size",
    description: "a taco dog",
    yearOfBirth: "20/07/2022",
    gender: "Male",
    species: "dog",
    races: ["dashund"],
    user: new Types.ObjectId("6471018db5f9829cfe43b6ca"),
  },
];
