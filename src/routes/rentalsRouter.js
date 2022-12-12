import { Router } from "express";
import { rentalConditionsValidation, rentalSchemaValidation } from "../middlewares/rentalsMiddleware.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", rentalSchemaValidation, rentalConditionsValidation);

export default rentalsRouter;