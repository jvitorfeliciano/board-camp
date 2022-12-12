import connectionDB from "../db/db.js";
import categorySchema from "../models/categorySchema.js";

const categoryValidation = async (req, res, next) => {
  const category = req.body;

  const { error } = categorySchema.validate(category);

  if (error) {
    const errors = error.details.map((detail) => detail.message);

    return res.status(400).send(errors);
  }

  try {
    const alredyRegistered = await connectionDB.query(
      `SELECT * FROM categories WHERE name=$1`,
      [category.name]
    );
    if (alredyRegistered.rowCount > 0) {
      return res.sendStatus(409);
    }
    res.locals.name = category.name;
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
  next();
};

export default categoryValidation;
