import connectionDB from "../db/db.js";

export const getGames = async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      const filteredGamesByName = await connectionDB.query(
        `SELECT games.* , categories.name AS "categoryName"
         FROM games 
         JOIN categories
         ON games."categoryId" = categories.id
         WHERE  games.name ILIKE  $1 || '%'
         `,
        [name]
      );

      return res.send(filteredGamesByName.rows);
    } else {
      const allGames = await connectionDB.query(
        `SELECT games.* , categories.name AS "categoryName"
         FROM games 
         JOIN categories
         ON games."categoryId" = categories.id
         `
      );

      return res.send(allGames.rows);
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const postGame = async (req, res) => {
  const { name, image, stockTotal, categoryId, pricePerDay } =
    res.locals.gameInformation;

  try {
    await connectionDB.query(
      `INSERT INTO  games 
            (name, image, "stockTotal", "categoryId", "pricePerDay")
       VALUES
            ($1,$2, $3, $4, $5)`,
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
