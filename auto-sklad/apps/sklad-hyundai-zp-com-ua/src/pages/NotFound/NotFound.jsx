import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';

import { Footer } from '../../components/Footer';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" fontWeight="bold">
          404
        </Typography>

        <Typography variant="h5" sx={{ mb: 2 }}>
          Сторінку не знайдено
        </Typography>

        <Button variant="contained" onClick={() => navigate('/')}>
          На головну
        </Button>
      </Box>
      <Footer />
    </>
  );
}

export default NotFound;
