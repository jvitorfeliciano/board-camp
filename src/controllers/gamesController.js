import connectionDB from "../db/db.js";

export const getGames = async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      const filteredGamesByName = await connectionDB.query(
        `SELECT games.* , categories.name AS "categoryName"
         FROM games 
         WHERE  name ILIKE  $1 || '%'
         JOIN categories
         ON games."categoryId" = categories.id
         `,
        [name]
      );

      return res.send(filteredGamesByName.rows);
    } else {
      const allGames = await connectionDB.query(
        `SELECT games.* , categories.name AS categoryName
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
