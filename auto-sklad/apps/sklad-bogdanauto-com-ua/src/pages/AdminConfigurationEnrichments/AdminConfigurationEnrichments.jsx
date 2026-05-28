import { useEffect, useState, useRef } from 'react';
import { Box, Button, Card, CardContent, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Layout } from '../../components/Layout/Layout';

import {
  getConfigurationEnrichments,
  createConfigurationEnrichment,
  deleteConfigurationEnrichment,
  updateConfigurationEnrichment,
} from '../../api/enrichments.api';

import ConfigurationEnrichmentForm from '../../components/User/ConfigurationEnrichmentForm';

export function AdminConfigurationEnrichments() {
  const [items, setItems] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // ---------------- LOAD LIST ----------------

  const fetchData = async () => {
    try {
      const data = await getConfigurationEnrichments();
      setItems(data || []);
      setPage(1);
    } catch (error) {
      console.error('GET enrichments error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ---------------- CREATE ----------------

  const handleCreate = async (payload) => {
    try {
      await createConfigurationEnrichment({
        ...payload,
        enginePowerHP: payload.enginePowerHP ? Number(payload.enginePowerHP) : null,
      });

      await fetchData();
      setShowCreateForm(false);
    } catch (error) {
      console.error('CREATE enrichment error:', error);

      if (error.response?.status === 422) {
        alert('Форма заповнена некоректно');
        return;
      }

      alert('Помилка створення enrichment');
    }
  };
  // ---------------- Delete ----------------
  const handleDelete = async (id) => {
    if (!confirm('Видалити enrichment?')) return;

    try {
      await deleteConfigurationEnrichment(id);
      await fetchData();
    } catch (error) {
      console.error('DELETE error:', error);
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setShowCreateForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  };
  // ---------------- Update ----------------
  const handleUpdate = async (payload) => {
    try {
      await updateConfigurationEnrichment(payload);

      await fetchData();
      setEditingItem(null);
      setShowCreateForm(false);
    } catch (error) {
      console.error('UPDATE error:', error);

      if (error.response?.status === 422) {
        alert('Некоректні дані у формі');
        return;
      }

      alert('Помилка оновлення enrichment');
    }
  };
  // ---------------- UI ----------------

  return (
    <>
      <Header />

      <Button color="error" onClick={handleLogout}>
        Вийти
      </Button>
      <Button variant="outlined" onClick={() => navigate('/admin')}>
        Адмін панель
      </Button>

      <Layout>
        <Container sx={{ py: 4 }}>
          <Stack spacing={3}>
            <Typography variant="h4" fontWeight={700}>
              Configuration Enrichments
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              Кількість Configuration Enrichments: {items.length}
            </Typography>
            {/* BUTTON */}
            <Box>
              <Button
                variant="contained"
                onClick={() => {
                  setEditingItem(null);
                  setShowCreateForm((prev) => !prev);
                }}
              >
                {showCreateForm ? 'Закрити' : 'Створити enrichment'}
              </Button>
            </Box>

            {/* FORM */}
            {showCreateForm && (
              <Card ref={formRef}>
                <CardContent>
                  <ConfigurationEnrichmentForm
                    key={editingItem?.id || 'create'}
                    onSubmit={editingItem ? handleUpdate : handleCreate}
                    initialData={editingItem}
                  />
                </CardContent>
              </Card>
            )}

            {/* LIST */}
            <Stack spacing={2}>
              {paginatedItems.map((item, index) => {
                const globalIndex = (page - 1) * itemsPerPage + index + 1;

                return (
                  <Card key={item.id} sx={{ padding: '0 0 20px 20px' }}>
                    <CardContent>
                      <Stack spacing={1}>
                        <Typography fontWeight={700}>#{globalIndex}</Typography>

                        <Typography>
                          <b>configurationId:</b> {item.configurationId}
                        </Typography>

                        <Typography>
                          <b>Brand:</b> {item.carBrand}
                        </Typography>

                        <Typography>
                          <b>Model:</b> {item.model}
                        </Typography>

                        <Typography>
                          <b>Configuration:</b> {item.configuration}
                        </Typography>

                        <Typography>
                          <b>Engine:</b> {item.engine}
                        </Typography>

                        <Typography>
                          <b>trimLevel:</b> {item.trimLevel}
                        </Typography>
                      </Stack>
                    </CardContent>

                    <Button color="error" variant="outlined" onClick={() => handleDelete(item.id)}>
                      Видалити
                    </Button>

                    <Button variant="outlined" onClick={() => handleEditClick(item)}>
                      Редагувати
                    </Button>
                  </Card>
                );
              })}
            </Stack>
          </Stack>
          <Box mt={3} display="flex" justifyContent="center">
            <Pagination count={pageCount} page={page} onChange={(event, value) => setPage(value)} color="primary" />
          </Box>
        </Container>
      </Layout>

      <Footer />
    </>
  );
}

export default AdminConfigurationEnrichments;
