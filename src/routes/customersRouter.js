import { Router } from "express";
import { getCustomers } from "../controllers/customersController.js";
import { customerExistenceValidation } from "../middlewares/customersMiddlewares.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", customerExistenceValidation);

export default customersRouter;
