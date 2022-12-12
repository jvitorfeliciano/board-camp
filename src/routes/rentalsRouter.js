import { Router } from "express";
import { finishRental, getRentals, postRental } from "../controllers/rentalsController.js";
import {
  rentalConditionsValidation,
  rentalExistenceValidation,
  rentalSchemaValidation,
  validationOfconditionsToDeleteRental,
  validationOfconditionsToFinishRental,
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
    validationOfconditionsToFinishRental,
    finishRental
  );
  rentalsRouter.delete(
    "/rentals/:id",
    rentalExistenceValidation,
    validationOfconditionsToDeleteRental
  );
  
export default rentalsRouter;
