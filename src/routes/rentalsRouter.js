import { Router } from "express";
import { postRental } from "../controllers/rentalsController.js";
import { rentalConditionsValidation, rentalSchemaValidation } from "../middlewares/rentalsMiddleware.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", rentalSchemaValidation, rentalConditionsValidation, postRental);

export default rentalsRouter;