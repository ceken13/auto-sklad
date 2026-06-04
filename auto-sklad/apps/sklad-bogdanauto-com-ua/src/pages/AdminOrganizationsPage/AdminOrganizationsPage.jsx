import { useEffect, useRef, useState } from 'react';
import { Box, Button, Card, CardContent, Container, Stack, Typography, Pagination } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Layout } from '../../components/Layout/Layout';

import {
  getOrganizations,
  createOrganization,
  deleteOrganization,
  updateOrganization,
} from '../../api/organizations.api';

import OrganizationForm from '../../components/User/OrganizationForm';

export function AdminOrganizationsPage() {
  const [items, setItems] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const navigate = useNavigate();
  const formRef = useRef(null);

  const [page, setPage] = useState(1);

  const itemsPerPage = 10;

  const pageCount = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // ---------------- LOGOUT ----------------

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // ---------------- LOAD ----------------

  const fetchData = async () => {
    try {
      const data = await getOrganizations();

      setItems(data || []);
      setPage(1);
    } catch (error) {
      console.error('GET organizations error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ---------------- CREATE ----------------

  const handleCreate = async (payload) => {
    try {
      await createOrganization(payload);

      await fetchData();

      setShowCreateForm(false);
    } catch (error) {
      console.error('CREATE organization error:', error);

      alert('Помилка створення організації');
    }
  };

  // ---------------- DELETE ----------------

  const handleDelete = async (slug) => {
    if (!confirm('Видалити організацію?')) return;

    try {
      await deleteOrganization(slug);

      await fetchData();
    } catch (error) {
      console.error('DELETE organization error:', error);

      alert('Помилка видалення');
    }
  };

  // ---------------- EDIT ----------------

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

  // ---------------- UPDATE ----------------

  const handleUpdate = async (payload) => {
    try {
      await updateOrganization(editingItem.slug, {
        name: payload.name,
        dealerCode: payload.dealerCode,
        dealerCity: payload.dealerCity,
        inUkraine: payload.inUkraine,
      });

      await fetchData();

      setEditingItem(null);

      setShowCreateForm(false);
    } catch (error) {
      console.error('UPDATE organization error:', error);

      alert('Помилка оновлення');
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
              Organizations
            </Typography>

            <Typography variant="body1" fontWeight={600}>
              Кількість організацій: {items.length}
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
                {showCreateForm ? 'Закрити' : 'Створити організацію'}
              </Button>
            </Box>

            {/* FORM */}

            {showCreateForm && (
              <Card ref={formRef}>
                <CardContent>
                  <OrganizationForm
                    key={editingItem?.slug || 'create'}
                    initialData={editingItem}
                    onSubmit={editingItem ? handleUpdate : handleCreate}
                  />
                </CardContent>
              </Card>
            )}

            {/* LIST */}

            <Stack spacing={2}>
              {paginatedItems.map((item, index) => {
                const globalIndex = (page - 1) * itemsPerPage + index + 1;

                return (
                  <Card key={item.slug}>
                    <CardContent>
                      <Stack spacing={1}>
                        <Typography fontWeight={700}>#{globalIndex}</Typography>

                        <Typography>
                          <b>Slug:</b> {item.slug}
                        </Typography>

                        <Typography>
                          <b>Name:</b> {item.name}
                        </Typography>

                        <Typography>
                          <b>Dealer Code:</b> {item.dealerCode || '-'}
                        </Typography>

                        <Typography>
                          <b>Dealer City:</b> {item.dealerCity || '-'}
                        </Typography>

                        <Typography>
                          <b>In Ukraine:</b> {item.inUkraine ? 'Так' : 'Ні'}
                        </Typography>
                      </Stack>
                    </CardContent>

                    <Box
                      sx={{
                        display: 'flex',
                        gap: 2,
                        p: 2,
                      }}
                    >
                      <Button color="error" variant="outlined" onClick={() => handleDelete(item.slug)}>
                        Видалити
                      </Button>

                      <Button variant="outlined" onClick={() => handleEditClick(item)}>
                        Редагувати
                      </Button>
                    </Box>
                  </Card>
                );
              })}
            </Stack>

            {/* PAGINATION */}

            <Box mt={3} display="flex" justifyContent="center">
              <Pagination count={pageCount} page={page} onChange={(event, value) => setPage(value)} color="primary" />
            </Box>
          </Stack>
        </Container>
      </Layout>

      <Footer />
    </>
  );
}

export default AdminOrganizationsPage;
