import { Router } from "express";
import {
  getCustomerById,
  getCustomers,
} from "../controllers/customersController.js";
import {
 
  customerExistenceValidation, customerSchemaValidation,
} from "../middlewares/customersMiddleware.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get(
  "/customers/:id",
  customerExistenceValidation,
  getCustomerById
);
customersRouter.post("/customers", customerSchemaValidation);
export default customersRouter;
