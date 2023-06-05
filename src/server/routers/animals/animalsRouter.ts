import { Router } from "express";
import { getAnimals } from "../../controllers/animals/animalsControllers.js";
import auth from "../../middlewares/auth/authMiddleware.js";

const animalsRouter = Router();

animalsRouter.get("/", auth, getAnimals);

export default animalsRouter;
