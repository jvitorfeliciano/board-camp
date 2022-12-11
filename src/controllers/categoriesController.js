import connectionDB from "../db/db.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await connectionDB.query(`SELECT * FROM categories`);
    return res.send(categories.rows);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};


