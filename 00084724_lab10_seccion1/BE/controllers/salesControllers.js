import pool from "../config/db.js";

const postSales = async (request, response) => {
  const { amount, id_customer } = request.body;

  // 1. Validar que los datos necesarios estén presentes
  if (!amount || !id_customer) {
    return response
      .status(400)
      .json({ message: "Faltan los campos amount o id_customer" });
  }

  try {
    // 2. Validar que id_customer exista en la tabla customers [cite: 57]
    const customerCheck = await pool.query(
      "SELECT * FROM customers WHERE id = $1",
      [id_customer]
    );

    if (customerCheck.rows.length === 0) {
      return response
        .status(404)
        .json({ message: "Error: El cliente (id_customer) no existe" });
    }

    // 3. Insertar en sales con amount y created_at (usar NOW()) [cite: 58]
    const result = await pool.query(
      "INSERT INTO sales (amount, created_at, id_customer) VALUES ($1, NOW(), $2) RETURNING *",
      [amount, id_customer]
    );

    response  
      .status(201)
      .json({
        message: "Venta registrada con éxito",
        sale: result.rows[0],
      });
  } catch (error) {
    console.error("Error en postSales:", error);
    response.status(500).json({ message: "Error al registrar la venta" });
  }
};

const getSalesWithCustomerName = (request, response) => {
  const query = `
    SELECT s.id, s.amount, s.created_at, c.name 
    FROM sales s 
    JOIN customers c ON s.id_customer = c.id
    ORDER BY s.created_at DESC;
  `;

  try {
    pool.query(query, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  } catch (error) {
    console.error("Error en getSalesWithCustomerName:", error);
    response
      .status(500)
      .json({ message: "Error retrieving sales with customer names" });
  }
};

const getSalesReport = (request, response) => {
  const query = `
    SELECT c.name, SUM(s.amount) AS total_sales
    FROM sales s
    JOIN customers c ON s.id_customer = c.id
    GROUP BY c.name
    ORDER BY total_sales DESC;
  `;

  try {
    pool.query(query, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  } catch (error) {
    console.error("Error en getSalesReport:", error);
    response.status(500).json({ message: "Error generating sales report" });
  }
};

export {postSales, getSalesWithCustomerName, getSalesReport
}
