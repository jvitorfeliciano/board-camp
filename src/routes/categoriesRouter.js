import { Router } from "express";
import { getCategories } from "../controllers/categoriesController.js";
import categoryValidation from "../middlewares/categoryMiddleware.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategories)
categoriesRouter.post("/categories",categoryValidation)

export default categoriesRouter;