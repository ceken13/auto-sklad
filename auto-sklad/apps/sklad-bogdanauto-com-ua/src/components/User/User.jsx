import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Layout } from '../Layout/Layout';
import AdminCarForm from './AdminCarForm';
import AdminCarsList from './AdminCarsList';

export function User() {
  const [cars, setCars] = useState(() => {
    // Ініціалізація стану з localStorage
    try {
      const stored = localStorage.getItem('cars');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [editingCar, setEditingCar] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Коли змінюється cars, оновлюємо localStorage
  useEffect(() => {
    localStorage.setItem('cars', JSON.stringify(cars));
  }, [cars]);

  const addCar = (newCar) => {
    setCars((prev) => [...prev, { id: Date.now(), ...newCar }]);
    setShowForm(false);
  };

  const updateCar = (updatedCar) => {
    setCars((prev) => prev.map((car) => (car.id === updatedCar.id ? updatedCar : car)));
    setEditingCar(null);
    setShowForm(false);
  };

  const deleteCar = (id) => {
    setCars((prev) => prev.filter((car) => car.id !== id));
  };

  const handleEdit = (car) => {
    setEditingCar(car);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingCar(null);
    setShowForm(true);
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" mb={3}>
          Адмін панель
        </Typography>

        <Button variant="contained" sx={{ mb: 2 }} onClick={handleAddNew}>
          Додати авто
        </Button>

        {showForm && <AdminCarForm onSubmit={editingCar ? updateCar : addCar} editingCar={editingCar} />}

        <AdminCarsList cars={cars} onEdit={handleEdit} onDelete={deleteCar} />
      </Box>
    </Layout>
  );
}

export default User;
