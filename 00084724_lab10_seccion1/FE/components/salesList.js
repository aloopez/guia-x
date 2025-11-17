// Componente SalesList que muestre: ID venta, monto, fecha, nombre del cliente. 
import React, { useState, useEffect } from 'react';

// URL de API de BE
const API_URL = 'http://localhost:5001/api/sales';

function SalesList() {
  // Estado para guardar la lista de ventas
  const [sales, setSales] = useState([]);
  
  useEffect(() => {
    // Función para obtener las ventas desde el backend
    const fetchSales = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setSales(data);
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    };

    fetchSales();
  }, []);
    // Renderiza la lista de clientes
    return (
      <div>
        <h2>Lista de Ventas</h2>
        <ul>
          {sales.map((sale) => (
            <li key={sale.id}>
              ID Venta: {sale.id}, Monto: {sale.amount}, Fecha: {sale.date}, Cliente: {sale.customerName}
            </li>
          ))}
        </ul>
      </div>
    );
}

export default SalesList;