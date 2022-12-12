import { Router } from "express";
import { rentalSchemaValidation } from "../middlewares/rentalsMiddleware.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", rentalSchemaValidation);

export default rentalsRouter;