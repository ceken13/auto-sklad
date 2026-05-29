import { useEffect, useRef, useState } from 'react';

import { Box, Button, Card, CardContent, Container, Pagination, Stack, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Layout } from '../../components/Layout/Layout';

import { createUser, deleteUser, getUsers, upsertUser } from '../../api/usersList.api';

import AdminUserListForm from '../../components/User/AdminUserListForm';

export function AdminUsersListPage() {
  const [items, setItems] = useState([]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const navigate = useNavigate();

  const formRef = useRef(null);

  const [page, setPage] = useState(1);

  const itemsPerPage = 10;

  const pageCount = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // ---------------- LOAD ----------------

  const fetchData = async () => {
    try {
      const data = await getUsers();

      setItems(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ---------------- CREATE ----------------

  const handleCreate = async (payload) => {
    try {
      await createUser(payload);

      await fetchData();
      setEditingItem(null);
      setShowCreateForm(false);
    } catch (error) {
      console.error(error);

      alert('Помилка створення юзера');
    }
  };

  // ---------------- DELETE ----------------

  const handleDelete = async (item) => {
    if (!confirm('Видалити юзера?')) return;

    try {
      await deleteUser(item.organizationSlug, item.username);

      await fetchData();
    } catch (error) {
      console.error(error);

      alert('Помилка видалення');
    }
  };

  const handleUpdate = async (payload) => {
    try {
      await upsertUser({
        ...payload,
        username: editingItem.username, // щоб не втратити ключ
      });

      await fetchData();

      setEditingItem(null);
      setShowCreateForm(false);
    } catch (error) {
      console.error(error);
      alert('Помилка оновлення юзера');
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
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
              Admin Users
            </Typography>

            <Typography variant="body1">Кількість юзерів: {items.length}</Typography>

            <Box>
              <Button
                variant="contained"
                onClick={() => {
                  setEditingItem(null);
                  setShowCreateForm((prev) => !prev);

                  setTimeout(() => {
                    formRef.current?.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }, 100);
                }}
              >
                {showCreateForm ? 'Закрити' : 'Створити юзера'}
              </Button>
            </Box>

            {/* FORM */}

            {showCreateForm && (
              <Card ref={formRef}>
                <CardContent>
                  <AdminUserListForm
                    key={editingItem ? editingItem.username : 'create'}
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
                  <Card key={index}>
                    <CardContent>
                      <Stack spacing={1}>
                        <Typography fontWeight={700}>#{globalIndex}</Typography>

                        <Typography>
                          <b>Username:</b> {item.username}
                        </Typography>

                        <Typography>
                          <b>Organization:</b> {item.organizationSlug}
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
                      <Button color="error" variant="outlined" onClick={() => handleDelete(item)}>
                        Видалити
                      </Button>
                      {/*<Button variant="outlined" onClick={() => handleEditClick(item)}>
                        Редагувати
                      </Button>*/}
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

export default AdminUsersListPage;
