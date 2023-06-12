import { Router } from "express";
import {
  createAnimal,
  getAnimalById,
  getAnimals,
  removeAnimal,
} from "../../controllers/animals/animalsControllers.js";
import { paths } from "../../utils/paths/paths.js";
import auth from "../../middlewares/auth/authMiddleware.js";
import { validate } from "express-validation";
import { createAnimalSchema } from "../../../schemas/AnimalShemas.js";

const animalsRouter = Router();

animalsRouter.get(paths.root, getAnimals);

animalsRouter.delete("/:idAnimal", auth, removeAnimal);

animalsRouter.post(
  paths.create,
  auth,
  validate(createAnimalSchema, {}, { abortEarly: false }),
  createAnimal
);

animalsRouter.get("/:idAnimal", getAnimalById);

export default animalsRouter;
