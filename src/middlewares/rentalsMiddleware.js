import connectionDB from "../db/db.js";
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

export const rentalConditionsValidation = async (req, res, next) => {
  const rentalInformations = res.locals.rentalInformations;

  try {
    const customer = await connectionDB.query(
      `SELECT *
       FROM customers
       WHERE id = $1
            `,
      [rentalInformations.customerId]
    );

    if (customer.rowCount === 0) {
      return res.status(400).send({ message: "Customer not found" });
    }

    const game = await connectionDB.query(
      `SELECT *
       FROM games
       WHERE id = $1
              `,
      [rentalInformations.gameId]
    );

    if (game.rowCount === 0) {
      return res.status(400).send({ message: "Game not found" });
    }

    res.locals.gameInformations = game.rows[0];

    const {rowCount} = await connectionDB.query(
      `SELECT *
       FROM rentals
       WHERE  "gameId" = $1 AND "returnDate" IS NULL
              `,
      [ rentalInformations.gameId]
    );
 
    const { stockTotal } = game.rows[0];
    const numberOfRentedGames = rowCount;

    if (numberOfRentedGames >= stockTotal) {
      return res.status(400).send({ message: "This is game is not available" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
  next();
};

export const rentalExistenceValidation = async (req, res, next) => {
  const { id } = req.params;

  try {
    const rental = await connectionDB.query(
      `SELECT * FROM rentals WHERE id=$1`,
      [id]
    );

    if (rental.rowCount === 0) {
      return res.status(404).send({ message: "Rental not found" });
    }
    res.locals.rental = rental;
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
  next();
};

export const validationOfconditionsToFinishRental = (req, res, next) => {
  const rental = res.locals.rental;
  const returnDate = rental.rows[0].returnDate;

  if (returnDate) {
    return res.status(400).send({ message: "Rental already finished" });
  }
  next();
};

export const validationOfconditionsToDeleteRental = (req, res, next) => {
  const rental = res.locals.rental;
  const returnDate = rental.rows[0].returnDate;

  if (!returnDate) {
    return res.status(400).send({ message: "Rental not finished" });
  }
  next();
};
