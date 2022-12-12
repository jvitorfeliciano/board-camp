import connectionDB from "../db/db.js";
import dayjs from "dayjs";

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

  const rentDate = dayjs().format("YYYY/MM/DD");

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

export const finishRental = async (req, res) => {
  const { id } = req.params;

  const returnDate = dayjs().format("YYYY/MM/DD");

  try {
    const rental = await connectionDB.query(
      `SELECT 
          rentals.*, now()::date - rentals."rentDate" as  "daysApart", games."pricePerDay" 
        FROM rentals
        JOIN games
        ON rentals."gameId" = games.id    
        WHERE rentals.id=$1`,
      [id]
    );

    const daysApart = rental.rows[0].daysApart;
    const daysRented = rental.rows[0].daysRented;
    const pricePerDay = rental.rows[0].pricePerDay;

    if (daysApart > daysRented) {
      const outdatedDays = daysApart - daysRented;
      const delayFee = outdatedDays * pricePerDay;
      await connectionDB.query(
        `UPDATE rentals 
           SET "returnDate"=$1, "delayFee"=$2
           WHERE id=$3
               `,
        [returnDate, delayFee, id]
      );
    } else {
      await connectionDB.query(
        `UPDATE rentals 
           SET "returnDate"=$1
           WHERE id=$2
            `,
        [returnDate, id]
      );
    }

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const deleteRental = async (req, res) => {
  const { id } = req.params;

  try {
    await connectionDB.query(`DELETE FROM rentals WHERE id=$1`, [id]);
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
