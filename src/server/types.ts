import { type Response, type Request } from "express";
import { type Types } from "mongoose";
import { type AnimalStructure } from "../types";

export interface CustomRequest extends Request {
  userId: string;
  params: { idAnimal: string };
  body: AnimalStructure;
}

export type CustomResponse = Pick<Response, "status" | "json">;

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserCredentialsStructure extends UserCredentials {
  _id: string;
}

export type UserCredentialsRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;

export type UserData = {
  _id: Types.ObjectId;
} & UserCredentials;

export interface CustomRequestQuerys extends Request {
  query: {
    limit: string;
    skip: string;
  };
}
