import { type UserCredentials } from "../../server/types";
import { type BadRequestUserCredentials } from "../types";

export const mockedUser: UserCredentials = {
  username: "admin",
  password: "admin",
};

export const mockUserHashed: UserCredentials = {
  username: "admin",
  password: "$2y$10$20vOAsWvPg2pZR.1hVOB0eRZTF6kNmkz4vLoxChymzJM5o1TwV6fi",
};

export const unauthorizedMockedUser: UserCredentials = {
  username: "wrongAdmin",
  password: "wrongAdmin",
};

export const badRequestMockedUser: BadRequestUserCredentials = {
  username: "wrongAdmin",
  password: 1,
};

export const tokenMock =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDZmYTA5MGI5MjYxNTYwMDk3NDY5MTMiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODY1OTMzOTMsImV4cCI6MTY4NzE5ODE5M30.MCqPIYzB2NWhf5TqUkcKDCw19JRQF5vjcPUkX1nky6w";

export const tokenPayloadMock = {
  sub: "646a4a6ae27e102276f098d6",
  name: "usaias",
  iat: 1684749820,
  exp: 1685354620,
};
