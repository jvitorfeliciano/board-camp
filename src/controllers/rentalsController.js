import connectionDB from "../db/db.js";

export const getRentals = async (req, res) => {
  const { customerId, gameId } = req.query;
  const baseQuery = `SELECT
                          rentals.*, customers.name AS "customerName", games.name AS "gameName", games."categoryId", games."categoryId", categories.name As "categoryName"
                      FROM rentals  
                      JOIN customers  
                      ON rentals."customerId" =  customers.id
                      JOIN games
                      ON rentals."gameId" = games.id
                      JOIN categories
                      ON games."categoryId"= categories.Id
  
  `;

  function query(firstQuery, secondQuery) {
    if (!firstQuery && !secondQuery) {
      return baseQuery;
    } else if (firstQuery) {
      return baseQuery + `WHERE customers.id = $1`;
    } else if (secondQuery) {
      return baseQuery + `WHERE games.id = $1`;
    }
  }

  function dataArray(firstQuery, secondQuery) {
    if (!firstQuery && !secondQuery) {
      return;
    } else if (firstQuery) {
      return [firstQuery];
    } else if (secondQuery) {
      return [secondQuery];
    }
  }

  try {
    const rentals = await connectionDB.query(
      query(customerId, gameId),
      dataArray(customerId, gameId)
    );
    console.log(rentals.rows);
    const formattedRentals = rentals.rows.map((rentals) => {
      return {
        id: rentals.id,
        customerId: rentals.customerId,
        gameId: rentals.gameId,
        rentDate: rentals.rentDate,
        daysRented: rentals.daysRented,
        returnDate: rentals.returnDate,
        originalPrice: rentals.originalPrice,
        delayFee: rentals.delayFee,
        customer: {
          id: rentals.customerId,
          name: rentals.customerName,
        },
        game: {
          id: rentals.gameId,
          name: rentals.gameName,
          categoryId: rentals.categoryId,
          categoryName: rentals.categoryName,
        },
      };
    });
    return res.send(formattedRentals);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

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
    return res.status(500).send({ message: err.message });
  }
};
