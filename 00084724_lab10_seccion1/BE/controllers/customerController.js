import pool from "../config/db.js";

const getCustomers = (request, response) => {
  try {
    pool.query("SELECT * FROM customers ORDER BY id ASC", (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Error retrieving customers" });
  }
};

const postSales = (request, response) => {
  const { id } = request.body;
}

export {
  getCustomers,
  postSales,
};