import connectionDB from "../db/db.js";
import gameSchema from "../models/gameSchema.js";

const gameValidation = async (req, res, next) => {
  const gameInformation = req.body;

  const { error } = gameSchema.validate(gameInformation, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);

    return res.status(400).send(errors);
  }

  try {
    const category = await connectionDB.query(
      `SELECT * FROM categories WHERE id=$1`,
      [gameInformation.categoryId]
    );
    if (category.rowCount === 0) {
      return res.status(400).send({ message: "This category doesn't exist" });
    }

    const game = await connectionDB.query(`SELECT * FROM games WHERE name=$1`, [
      gameInformation.name,
    ]);

    if (game.rowCount > 0) {
      return res
        .status(409)
        .send({ message: "This game is already registered" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
  res.locals.gameInformation = gameInformation;
  next();
};

export default gameValidation;
