import { Router } from "express";
import { getRentals, postRental } from "../controllers/rentalsController.js";
import {
  rentalConditionsValidation,
  rentalExistenceValidation,
  rentalSchemaValidation,
} from "../middlewares/rentalsMiddleware.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals",getRentals);
rentalsRouter.post(
  "/rentals",
  rentalSchemaValidation,
  rentalConditionsValidation,
  postRental
);
rentalsRouter.post(
    "/rentals/:id/return",
    rentalExistenceValidation,
  );
export default rentalsRouter;
