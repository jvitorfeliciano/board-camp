import { Router } from "express";
import {
  getCustomerById,
  getCustomers,
  postCustomer,
  updateCostumer,
} from "../controllers/customersController.js";
import {
  cpfExistenceValidation,
  customerExistenceValidation,
  customerSchemaValidation,
} from "../middlewares/customersMiddleware.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get(
  "/customers/:id",
  customerExistenceValidation,
  getCustomerById
);
customersRouter.post(
  "/customers",
  customerSchemaValidation,
  cpfExistenceValidation,
  postCustomer
);
customersRouter.put(
  "/customers/:id",
  customerExistenceValidation,
  customerSchemaValidation,
  cpfExistenceValidation,
  updateCostumer
);
export default customersRouter;
