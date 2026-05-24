import React, { useState, useEffect } from 'react';

import { Box, Typography, Button } from '@mui/material';

import { Layout } from '../Layout/Layout';

import AdminCarForm from './AdminCarForm';
import AdminCarsList from './AdminCarsList';

import { getAdminCars, createAdminCar, updateAdminCar, deleteAdminCar, getAdminMe } from '../../api/admin.api';

export function User() {
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(false);

  // ---------------- FETCH CARS ----------------

  const fetchCars = async () => {
    try {
      setLoading(true);

      const slug = localStorage.getItem('organizationSlug');

      console.log('CURRENT ORGANIZATION:', slug);

      const data = await getAdminCars(slug);

      console.log('CARS:', data);

      setCars(data || []);
    } catch (error) {
      console.error('GET cars error:', error);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- ADMIN ME ----------------

  useEffect(() => {
    const test = async () => {
      const data = await getAdminMe();

      console.log('ADMIN ME:', data);
    };

    test();
  }, []);

  // ---------------- LOAD CARS ----------------

  useEffect(() => {
    fetchCars();
  }, []);

  // ---------------- CREATE ----------------

  const addCar = async (form) => {
    try {
      const slug = localStorage.getItem('organizationSlug');

      // 👇 ОЦЕ ДОДАЙ
      console.log('CREATE PAYLOAD:', form);
      console.log('VIN:', form.vinCode);
      console.log('enginePowerHP:', form.enginePowerHP);
      console.log('year:', form.year);
      console.log('sliderImages:', form.sliderImages);

      await createAdminCar(form, slug);

      await fetchCars();
      setShowForm(false);
    } catch (error) {
      console.error('CREATE error:', error);
      alert('Помилка створення авто');
    }
  };

  // ---------------- UPDATE ----------------

  const updateCar = async (form) => {
    try {
      const slug = localStorage.getItem('organizationSlug');

      await updateAdminCar(form.vinCode, slug, form);

      await fetchCars();

      setEditingCar(null);

      setShowForm(false);
    } catch (error) {
      console.error('UPDATE error:', error);

      alert('Помилка оновлення авто');
    }
  };

  // ---------------- DELETE ----------------

  const handleDelete = async (vinCode) => {
    try {
      const slug = localStorage.getItem('organizationSlug');

      await deleteAdminCar(vinCode, slug);

      await fetchCars();
    } catch (error) {
      console.error('DELETE error:', error);

      alert('Помилка видалення авто');
    }
  };

  // ---------------- UI ----------------

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

        {showForm && <AdminCarForm onSubmit={addCar} editingCar={editingCar} />}

        {loading ? (
          <Typography>Завантаження...</Typography>
        ) : (
          <AdminCarsList cars={cars} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </Box>
    </Layout>
  );
}

export default User;
