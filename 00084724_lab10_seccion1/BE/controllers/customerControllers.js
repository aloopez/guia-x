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

const getCustomerByCode = (request, response) => {
  const { code } = request.query; // Obtener 'code' de los query params

  if (!code) {
    return response
      .status(400)
      .json({ message: "Falta el parámetro 'code' en la consulta" });
  }

  try {
    pool.query(
      "SELECT * FROM customers WHERE code = $1",
      [code],
      (error, results) => {
        if (error) {
          throw error;
        }
        if (results.rows.length === 0) {
          return response
            .status(404)
            .json({ message: "No se encontró ningún cliente con ese código" });
        }
        response.status(200).json(results.rows);
      }
    );
  } catch (error) {
    console.error("Error en getCustomerByCode:", error);
    response.status(500).json({ message: "Error searching for customer" });
  }
};

export { getCustomers, getCustomerByCode};