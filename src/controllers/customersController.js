import connectionDB from "../db/db.js";

export const getCustomers = async (req, res) => {
  const { cpf } = req.query;

  try {
    if (cpf) {
      const customersFilteredByCpf = await connectionDB.query(
        `SELECT *
         FROM customers
         WHERE cpf LIKE $1 ||'%'
        `,
        [cpf]
      );
      res.send(customersFilteredByCpf.rows);
    } else {
      const allCustomers = await connectionDB.query(`SELECT * FROM customers`);
      res.send(allCustomers.rows);
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

