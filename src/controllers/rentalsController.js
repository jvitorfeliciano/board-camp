import connectionDB from "../db/db.js";

export const postRental = async (req, res) => {
  const { customerId, gameId, daysRented } = res.locals.rentalInformations;
  const { pricePerDay } = res.locals.gameInformations;

  const rentDate = new Date().toLocaleDateString("pt-br");

  const originalPrice = pricePerDay * daysRented;
  const returnDate = null;
  const delayFee = null;

  try {
    await connectionDB.query(
      `INSERT INTO 
            rentals
            ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
        VALUES
            ($1, $2, $3, $4, $5, $6, $7)
    `,
      [
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
      ]
    );
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send({ message: "Server error" });
  }
};

