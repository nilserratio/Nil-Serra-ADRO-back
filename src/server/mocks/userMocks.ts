import { type UserCredentials } from "../types";

export const mockedUser: UserCredentials = {
  username: "admin",
  password: "admin",
};

export const mockUserHashed: UserCredentials = {
  username: "admin",
  password: "$2y$10$20vOAsWvPg2pZR.1hVOB0eRZTF6kNmkz4vLoxChymzJM5o1TwV6fi",
};
