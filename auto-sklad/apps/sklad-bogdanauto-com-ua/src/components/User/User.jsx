import React, { useState, useEffect, useRef } from 'react';

import { Box, Typography, Button } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Layout } from '../Layout/Layout';

import AdminCarForm from './AdminCarForm';
import AdminCarsList from './AdminCarsList';
import { Link } from 'react-router-dom';

import { getAdminCars, createAdminCar, updateAdminCar, deleteAdminCar, getAdminMe } from '../../api/admin.api';
import { getOrganizations } from '../../api/organizations.api';

export function User() {
  const formRef = useRef(null);
  const scrollToForm = () => {
    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  };
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);

  // ---------------- FETCH CARS ----------------

  const fetchCars = async () => {
    try {
      setLoading(true);

      const localSlug = localStorage.getItem('organizationSlug');

      const orgSlug = user?.role === 'superadmin' ? selectedOrg : localSlug;

      console.log('CURRENT ORGANIZATION:', orgSlug);

      const data = await getAdminCars(orgSlug);

      setCars(data || []);
    } catch (error) {
      console.error('GET cars error:', error);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- ADMIN ME ----------------

  useEffect(() => {
    const loadMe = async () => {
      try {
        const data = await getAdminMe();

        console.log('ADMIN ME:', data);

        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadMe();
  }, []);
  // ---------------- LOAD Organizations ----------------
  useEffect(() => {
    if (user?.role === 'superadmin') {
      const loadOrgs = async () => {
        const data = await getOrganizations();
        setOrganizations(data);
      };

      loadOrgs();
    }
  }, [user]);

  // ---------------- LOAD CARS ----------------
  useEffect(() => {
    fetchCars();
  }, [selectedOrg, user]);

  // ---------------- CREATE ----------------

  const addCar = async (form) => {
    try {
      const slug = form.organizationSlug;
      console.log('CREATE PAYLOAD:', form);

      await createAdminCar(form, slug);

      await fetchCars();
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  // ---------------- UPDATE ----------------

  const updateCar = async (form) => {
    try {
      await updateAdminCar(form.vinCode, form.organizationSlug, form);

      await fetchCars();

      setEditingCar(null);
      setShowForm(false);
    } catch (error) {
      console.error('UPDATE error:', error);
      alert('Помилка оновлення авто');
    }
  };

  // ---------------- DELETE ----------------

  const handleDelete = async (car) => {
    try {
      await deleteAdminCar(car.vinCode, car.organizationSlug);

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
    scrollToForm();
  };

  const handleAddNew = () => {
    setEditingCar(null);

    setShowForm(true);
    scrollToForm();
  };
  const isSuperAdmin = user?.role === 'superadmin';

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" mb={3}>
          Адмін панель
        </Typography>

        <Button variant="contained" sx={{ m: 2, width: 'auto' }} onClick={handleAddNew}>
          Додати авто
        </Button>
        {isSuperAdmin && (
          <>
            <Button
              component={Link}
              to="/admin/configuration-enrichments"
              variant="contained"
              sx={{ m: 2, width: 'auto' }}
            >
              Додати шаблон (Configuration Enrichments)
            </Button>
            <Button component={Link} to="/admin/organizations" variant="contained" sx={{ m: 2, width: 'auto' }}>
              Додати організацію
            </Button>
            <Button component={Link} to="/admin/users-list" variant="contained" sx={{ m: 2, width: 'auto' }}>
              Додати Admin Users
            </Button>
            <Button component={Link} to="/admin/store-rules" variant="contained" sx={{ m: 2, width: 'auto' }}>
              Store Rules
            </Button>
          </>
        )}

        {isSuperAdmin && (
          <Box sx={{ m: 2, minWidth: 250, width: 'auto' }}>
            <Typography sx={{ mb: 1 }}>Організація</Typography>

            <FormControl fullWidth>
              <InputLabel id="org-select-label">Організація</InputLabel>

              <Select
                labelId="org-select-label"
                value={selectedOrg || ''}
                label="Організація"
                onChange={(e) => setSelectedOrg(e.target.value)}
              >
                <MenuItem value="">Всі організації</MenuItem>

                {organizations.map((org) => (
                  <MenuItem key={org.slug} value={org.slug}>
                    {org.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        {showForm && (
          <div ref={formRef}>
            <AdminCarForm
              onSubmit={editingCar ? updateCar : addCar}
              editingCar={editingCar}
              onClose={() => setShowForm(false)}
              user={user}
              organizations={organizations}
            />
          </div>
        )}
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
