import { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // ---------------- LOAD LIST ----------------

  const fetchData = async () => {
    try {
      const data = await getConfigurationEnrichments();
      setItems(data || []);
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
  };
  // ---------------- Update ----------------
  const handleUpdate = async (payload) => {
    try {
      await updateConfigurationEnrichment(editingItem.id, payload);

      await fetchData();
      setEditingItem(null);
      setShowCreateForm(false);
    } catch (error) {
      console.error('UPDATE error:', error);
    }
  };
  // ---------------- UI ----------------

  return (
    <>
      <Header />

      <Button color="error" onClick={handleLogout}>
        Вийти
      </Button>

      <Layout>
        <Container sx={{ py: 4 }}>
          <Stack spacing={3}>
            <Typography variant="h4" fontWeight={700}>
              Configuration Enrichments
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
              <Card>
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
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent>
                    <Stack spacing={1}>
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
                        <b>Power:</b> {item.enginePowerHP}
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
              ))}
            </Stack>
          </Stack>
        </Container>
      </Layout>

      <Footer />
    </>
  );
}

export default AdminConfigurationEnrichments;
