import { Router } from "express";
import categoriesRouter from "./categoriesRouter.js";

const router = Router();

categoriesRouter.use(categoriesRouter);

export default router;