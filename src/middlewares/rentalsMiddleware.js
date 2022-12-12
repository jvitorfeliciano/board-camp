import rentalSchema from "../models/rentalSchema.js";

export const rentalSchemaValidation = async (req, res, next) => {
  const rentalInformations = req.body;

  const { error } = rentalSchema.validate(rentalInformations, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  res.locals.rentalInformations = rentalInformations;
  next();
};
