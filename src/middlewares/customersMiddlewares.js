import connectionDB from "../db/db.js";

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
    return res.status(500).send({ message: "Server error" });
  }
  next();
};
