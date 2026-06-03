import { useEffect, useRef, useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Pagination,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Layout } from '../../components/Layout/Layout';
import { getOrganizations } from '../../api/organizations.api';

import { getStoreRules, upsertStoreRule, deleteStoreRule } from '../../api/storeRules.api';
import { getAdminMe } from '../../api/admin.api';
import StoreRuleForm from '../../components/User/StoreRuleForm';

export function AdminStoreRulesPage() {
  const [items, setItems] = useState([]);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const [editingItem, setEditingItem] = useState(null);
  const [user, setUser] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);

  const activeOrg = user?.role === 'superadmin' ? selectedOrg : localStorage.getItem('organizationSlug');

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

  useEffect(() => {
    const loadMe = async () => {
      try {
        const data = await getAdminMe();
        setUser(data);
      } catch (e) {
        console.error(e);
      }
    };

    loadMe();
  }, []);
  useEffect(() => {
    if (user?.role === 'superadmin') {
      const loadOrgs = async () => {
        const data = await getOrganizations();

        setOrganizations(data);

        if (data?.length > 0) {
          setSelectedOrg(data[0].slug);
        }
      };

      loadOrgs();
    }
  }, [user]);
  // ---------------- LOAD ----------------

  const fetchData = async () => {
    try {
      const data = await getStoreRules(activeOrg);

      setItems(data || []);
      setPage(1);
    } catch (error) {
      console.error('GET store rules error:', error);
    }
  };

  useEffect(() => {
    if (!user) return;

    if (user.role === 'superadmin' && !selectedOrg) return;

    fetchData();
  }, [user, selectedOrg]);

  // ---------------- CREATE ----------------

  const handleCreate = async (payload) => {
    try {
      await upsertStoreRule(payload.storeId, payload, activeOrg);

      await fetchData();

      setEditingItem(null);

      setShowCreateForm(false);
    } catch (error) {
      console.error('CREATE store rule error:', error);

      alert('Помилка створення правила');
    }
  };

  // ---------------- UPDATE ----------------

  const handleUpdate = async (payload) => {
    try {
      await upsertStoreRule(editingItem.storeId, payload, activeOrg);

      await fetchData();

      setEditingItem(null);

      setShowCreateForm(false);
    } catch (error) {
      console.error('UPDATE store rule error:', error);

      alert('Помилка оновлення правила');
    }
  };

  // ---------------- DELETE ----------------

  const handleDelete = async (storeId) => {
    if (!confirm('Видалити правило?')) return;

    try {
      await deleteStoreRule(storeId, activeOrg);

      await fetchData();
    } catch (error) {
      console.error('DELETE store rule error:', error, selectedOrg);

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
        {user?.role === 'superadmin' && (
          <Box sx={{ m: 2, minWidth: 250 }}>
            <Typography sx={{ mb: 1 }}>Організація</Typography>

            <FormControl fullWidth>
              <InputLabel>Організація</InputLabel>

              <Select value={selectedOrg || ''} label="Організація" onChange={(e) => setSelectedOrg(e.target.value)}>
                {organizations.map((org) => (
                  <MenuItem key={org.slug} value={org.slug}>
                    {org.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
        <Container sx={{ py: 4 }}>
          <Stack spacing={3}>
            <Typography variant="h4" fontWeight={700}>
              Store Rules
            </Typography>

            <Typography variant="body1" fontWeight={600}>
              Кількість правил: {items.length}
            </Typography>

            {/* BUTTON */}

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
                {showCreateForm ? 'Закрити' : 'Створити правило'}
              </Button>
            </Box>

            {/* FORM */}

            {showCreateForm && (
              <Card ref={formRef}>
                <CardContent>
                  <StoreRuleForm
                    key={editingItem?.storeId || 'create'}
                    initialData={editingItem}
                    onSubmit={editingItem ? handleUpdate : handleCreate}
                    organizationSlug={activeOrg}
                    isSuperadmin={user?.role === 'superadmin'}
                  />
                </CardContent>
              </Card>
            )}

            {/* LIST */}

            <Stack spacing={2}>
              {paginatedItems.map((item, index) => {
                const globalIndex = (page - 1) * itemsPerPage + index + 1;

                return (
                  <Card key={item.storeId}>
                    <CardContent>
                      <Stack spacing={1}>
                        <Typography fontWeight={700}>#{globalIndex}</Typography>

                        <Typography>
                          <b>Store ID:</b> {item.storeId}
                        </Typography>

                        <Typography>
                          <b>Store Name:</b> {item.storeName}
                        </Typography>

                        <Typography>
                          <b>Dealer City:</b> {item.dealerCity}
                        </Typography>

                        <Typography>
                          <b>Organization:</b> {item.organizationSlug}
                        </Typography>

                        <Typography>
                          <b>In Ukraine:</b> {item.inUkraine ? 'Так' : 'Ні'}
                        </Typography>

                        <Typography>
                          <b>Created:</b> {item.createdAt}
                        </Typography>

                        <Typography>
                          <b>Updated:</b> {item.updatedAt}
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
                      <Button color="error" variant="outlined" onClick={() => handleDelete(item.storeId)}>
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

export default AdminStoreRulesPage;
