import { Router } from "express";
import {
  getAnimals,
  removeAnimal,
} from "../../controllers/animals/animalsControllers.js";
import { paths } from "../../utils/paths/paths.js";
import auth from "../../middlewares/auth/authMiddleware.js";

const animalsRouter = Router();

animalsRouter.get(paths.root, getAnimals);

animalsRouter.delete("/:idAnimal", auth, removeAnimal);

export default animalsRouter;
