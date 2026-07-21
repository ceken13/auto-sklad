import { useEffect, useState, useRef } from 'react';
import { Box, Button, Card, CardContent, Container, Stack, Typography, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Layout } from '../../components/Layout/Layout';

import { getColors, upsertColor, deleteColor } from '../../api/colors.api';

import ColorForm from '../../components/User/ColorForm';

export function AdminColorsPage() {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [colors, setColors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingColor, setEditingColor] = useState(null);

  // ---------------- LOAD ----------------

  const fetchColors = async () => {
    try {
      const data = await getColors();
      setColors(data || []);
    } catch (error) {
      console.error('GET colors error:', error);
    }
  };

  useEffect(() => {
    fetchColors();
  }, []);

  // ---------------- CREATE / UPDATE ----------------

  const handleSubmit = async (payload) => {
    try {
      await upsertColor(payload);

      await fetchColors();

      setEditingColor(null);
      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert('Помилка збереження кольору');
    }
  };

  // ---------------- DELETE ----------------

  const handleDelete = async (sourceColor) => {
    if (!window.confirm('Видалити переклад кольору?')) return;

    try {
      await deleteColor(sourceColor);

      await fetchColors();
    } catch (error) {
      console.error(error);
      alert('Помилка видалення');
    }
  };

  // ---------------- EDIT ----------------

  const handleEdit = (color) => {
    setEditingColor(color);
    setShowForm(true);

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  };

  // ---------------- LOGOUT ----------------

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
              Довідник кольорів
            </Typography>

            <Typography fontWeight={600}>Кількість кольорів: {colors.length}</Typography>

            <Box>
              <Button
                variant="contained"
                onClick={() => {
                  setEditingColor(null);
                  setShowForm((prev) => !prev);
                }}
              >
                {showForm ? 'Закрити' : 'Додати переклад'}
              </Button>
            </Box>

            {showForm && (
              <Card ref={formRef}>
                <CardContent>
                  <ColorForm
                    key={editingColor?.sourceColor || 'create'}
                    initialData={editingColor}
                    colors={colors}
                    onSubmit={handleSubmit}
                    onClose={() => {
                      setEditingColor(null);
                      setShowForm(false);
                    }}
                  />
                </CardContent>
              </Card>
            )}

            <Stack spacing={2}>
              {colors.map((color, index) => (
                <Card key={color.sourceColor}>
                  <CardContent>
                    <Stack spacing={1}>
                      <Typography fontWeight={700}>#{index + 1}</Typography>

                      <Typography>
                        <b>Source:</b> {color.sourceColor}
                      </Typography>

                      <Typography>
                        <b>Display:</b> {color.displayColor || <span style={{ color: '#999' }}>не задано</span>}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {(color.usages || []).map((usage) => (
                          <Chip
                            key={usage}
                            label={usage === 'exterior' ? 'Кузов' : 'Салон'}
                            color={usage === 'exterior' ? 'primary' : 'success'}
                            size="small"
                          />
                        ))}
                      </Box>
                    </Stack>
                  </CardContent>

                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      px: 2,
                      pb: 2,
                    }}
                  >
                    <Button variant="outlined" onClick={() => handleEdit(color)}>
                      Редагувати
                    </Button>

                    <Button color="error" variant="outlined" onClick={() => handleDelete(color.sourceColor)}>
                      Видалити
                    </Button>
                  </Box>
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

export default AdminColorsPage;
