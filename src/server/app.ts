import express from "express";
import cors from "cors";
import morgan from "morgan";
import {
  generalError,
  notFoundError,
} from "./middlewares/error/errorMiddlewares.js";
import { pingController } from "./controllers/ping/pingController.js";
import { paths } from "./utils/paths/paths.js";
import userRouter from "./routers/user/userRouter.js";
import animalsRouter from "./routers/animals/animalsRouter.js";

const app = express();

const trustedOrigins = [
  process.env.ALLOWED_ORIGIN_DEV!,
  process.env.ALLOWED_ORIGIN_PROD!,
  process.env.ALLOWED_ORIGIN_PREVIEW!,
];

app.use(cors({ origin: trustedOrigins }));

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.get(paths.ping, pingController);

app.use(paths.user, userRouter);

app.use(paths.animals, animalsRouter);

app.use(notFoundError);

app.use(generalError);

export default app;
