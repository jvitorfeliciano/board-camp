import connectionDB from "../db/db.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await connectionDB.query(`SELECT * FROM categories`);
    return res.send(categories.rows);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const postCategory = async (req, res) => {
  const name = res.locals.name;
  try {
    await connectionDB.query(`INSERT INTO categories (name) VALUES ($1)`, [
      name,
    ]);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
