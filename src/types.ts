import { type Types } from "mongoose";

export interface AnimalDatabaseStructure {
  name: string;
  imageUrl: string;
  size: string;
  description: string;
  dateOfBirth: string;
  sex: string;
  species: string;
  races: string[];
  user: Types.ObjectId;
}

export interface AnimalDataStructure extends AnimalDatabaseStructure {
  _id: Types.ObjectId;
}
