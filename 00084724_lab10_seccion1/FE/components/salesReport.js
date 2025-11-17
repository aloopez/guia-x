
import React, { useState, useEffect } from 'react';

// URL de tu API de backend.
// Asegúrate de que el puerto (5000) coincida con el de tu servidor BE.
const API_URL = 'http://localhost:5001/api/sales/report';

function SalesReport() {
  // Estado para guardar el reporte de ventas
  const [report, setReport] = useState([]);

  useEffect(() => {
    // Función para obtener el reporte de ventas desde el backend
    const fetchReport = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setReport(data);
      } catch (error) {
        console.error('Error fetching sales report:', error);
      }
    };

    fetchReport();
  }, []);

  return (
    <div>
      <h2>Reporte de Ventas</h2>
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Total Ventas</th>
          </tr>
        </thead>
        <tbody>
          {report.map((item) => (
            <tr key={item.customer}>
              <td>{item.customer}</td>
              <td>{item.totalSales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesReport;