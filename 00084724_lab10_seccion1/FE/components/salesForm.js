// Formulario con campos: amount, id_customer. 
// Al enviar, llamar al endpoint y mostrar mensaje de éxito si se guarda la informacion.

import React, { useState } from 'react';

// URL de tu API de backend.
// Asegúrate de que el puerto (5000) coincida con el de tu servidor BE.
const API_URL = 'http://localhost:5001/api/sales';

function SalesForm() {
  // Estado para los campos del formulario
  const [amount, setAmount] = useState('');
  const [idCustomer, setIdCustomer] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, id_customer: idCustomer }),
      });

      if (response.ok) {
        setSuccessMessage('Venta guardada exitosamente.');
        setAmount('');
        setIdCustomer('');
      } else {
        setErrorMessage('Error al guardar la venta.');
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Monto:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>ID Cliente:</label>
        <input
          type="text"
          value={idCustomer}
          onChange={(e) => setIdCustomer(e.target.value)}
          required
        />
      </div>
      <button type="submit">Guardar Venta</button>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
}

export default SalesForm;