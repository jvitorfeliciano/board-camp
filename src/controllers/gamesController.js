import connectionDB from "../db/db.js";

export const getGames = async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      const filteredGamesByName = await connectionDB.query(
        `SELECT * 
         FROM games 
         WHERE  name ILIKE  $1 || '%'`,
        [name]
      );

      return res.send(filteredGamesByName.rows);
    } else {
      const allGames = await connectionDB.query(`SELECT * FROM games`);

      return res.send(allGames.rows);
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
