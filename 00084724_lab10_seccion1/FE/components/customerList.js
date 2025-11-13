import React, { useState, useEffect } from 'react';

// URL de tu API de backend.
// Asegúrate de que el puerto (5000) coincida con el de tu servidor BE.
const API_URL = 'http://localhost:5001/api/customers';

function CustomerList() {
  // Estado para guardar la lista de clientes
  const [customers, setCustomers] = useState([]);
  
  // Estado para saber si la información se está cargando
  const [loading, setLoading] = useState(true);
  
  // Estado para guardar cualquier error que ocurra
  const [error, setError] = useState(null);

  // useEffect se ejecuta cuando el componente se monta (carga)
  useEffect(() => {
    // Definimos una función asíncrona para traer los datos
    const fetchCustomers = async () => {
      try {
        // Hacemos la petición GET al endpoint del backend
        const response = await fetch(API_URL);

        // Si la respuesta no es exitosa (ej: error 404 o 500)
        if (!response.ok) {
          throw new Error(`Error al conectar con la API: ${response.statusText}`);
        }

        // Convertimos la respuesta a JSON
        const data = await response.json();
        
        // Guardamos los datos en nuestro estado
        setCustomers(data);

      } catch (e) {
        // Si hay un error en el 'try', lo capturamos y guardamos
        setError(e.message);
      } finally {
        // Haya o no error, dejamos de cargar
        setLoading(false);
      }
    };

    // Llamamos a la función que acabamos de definir
    fetchCustomers();
    
  }, []); // El array vacío [] asegura que esto se ejecute solo una vez

  // --- Renderizado del componente ---

  // Si está cargando, muestra un mensaje
  if (loading) {
    return <p>Cargando clientes...</p>;
  }

  // Si hubo un error, muestra el error
  if (error) {
    return <p>Error al cargar clientes: {error}</p>;
  }

  // Si todo salió bien, muestra la tabla
  return (
    <div>
      <h2>Lista de Clientes (Ejercicio 2)</h2>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Código</th>
          </tr>
        </thead>
        <tbody>
          {/* Usamos .map() para crear una fila <tr> por cada cliente */}
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.address}</td>
              <td>{customer.phone}</td>
              <td>{customer.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;