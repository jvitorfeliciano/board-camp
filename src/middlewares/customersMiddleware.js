import connectionDB from "../db/db.js";
import customerSchema from "../models/customerSchema.js";

export const customerExistenceValidation = async (req, res, next) => {
  const id = Number(req.params.id);

  try {
    const customer = await connectionDB.query(
      ` SELECT *
        FROM customers
        WHERE id=$1
      `,
      [id]
    );
    if (customer.rowCount === 0) {
      return res.status(404).send({ message: "Customer not found" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
  next();
};

export const customerSchemaValidation = async (req, res, next) => {
  const customerInformations = req.body;

  const { error } = customerSchema.validate(customerInformations, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((detail) => detail.message);

    return res.status(400).send(errors);
  }
  res.locals.customerInformations = customerInformations;
  next();
};
