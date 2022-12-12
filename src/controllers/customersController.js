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

export const getCustomerById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const customer = await connectionDB.query(
      `SELECT * 
       FROM customers
       WHERE id=$1
      `,
      [id]
    );

    return res.send(customer.rows[0]);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const postCustomer = async (req, res) => {
  const { name, phone, cpf, birthday } = res.locals.customerInformations;

  try {
    await connectionDB.query(
      ` INSERT INTO  customers (name, phone, cpf, birthday)
        VALUES ($1, $2,$3,$4)
       `,
      [name, phone, cpf, birthday]
    );
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const updateCostumer = async (req, res) => {
  const { name, phone, cpf, birthday } = res.locals.customerInformations;
  const id = Number(req.params.id);

  try {
    await connectionDB.query(
      `UPDATE customers  
       SET name=$1, phone=$2, cpf=$3, birthday=$4
       WHERE id=$5
           `,
      [name, phone, cpf, birthday, id]
    );
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
