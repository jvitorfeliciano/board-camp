import { Router } from "express";
import { getCustomerById, getCustomers } from "../controllers/customersController.js";
import { customerExistenceValidation } from "../middlewares/customersMiddleware.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", customerExistenceValidation, getCustomerById);

export default customersRouter;
