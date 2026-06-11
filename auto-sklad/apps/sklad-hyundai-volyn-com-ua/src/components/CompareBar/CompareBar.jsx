import { Box, Button, Typography } from '@mui/material';
import { useCompare } from '../../context/CompareContext';
import { getMediaUrl } from '../../utils/uploadImage';
import { useNavigate } from 'react-router-dom';

export default function CompareBar() {
  const { compareCars, removeCar, clearCompare } = useCompare();
  const navigate = useNavigate();

  if (!compareCars.length) return null;

  const handleCompare = () => {
    const vinList = compareCars.map((car) => car.vinCode).join('-');

    navigate(`/compare/${vinList}`);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#fff',
        borderTop: '1px solid #ddd',
        zIndex: 9999,
        display: 'flex',

        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        display: {
          xs: 'block',
          md: 'flex',
        },
      }}
    >
      {/* Ліва колонка */}
      <Box
        sx={{
          borderRight: '1px solid #ddd',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          p: 2,
          flexDirection: 'column',
          flexDirection: {
            md: 'column',
            xs: 'row',
            lg: 'column',
          },
          width: {
            md: '260',
            xs: '100%',
            lg: 260,
          },
        }}
      >
        {compareCars.length >= 2 && (
          <Button variant="contained" onClick={handleCompare} sx={{ width: '100%' }}>
            Порівняти авто {compareCars.length}/4
          </Button>
        )}

        <Button variant="text" onClick={clearCompare} sx={{ color: '#000', width: '100%' }}>
          Закрити
        </Button>
      </Box>

      {/* Автомобілі */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          overflowX: 'auto',
        }}
      >
        {compareCars.map((car) => (
          <Box
            key={car.id}
            sx={{
              width: 240,
              p: 2,
              textAlign: 'center',
              borderRight: '1px solid #eee',
            }}
          >
            <Box
              component="img"
              src={getMediaUrl(car?.imgCar) || '/images/car-placeholder.jpg'}
              onError={(e) => {
                e.currentTarget.src = '/images/car-placeholder.jpg';
              }}
              sx={{ width: '100%', height: 100, objectFit: 'contain' }}
            />

            <Typography sx={{ mt: 1, fontWeight: 600, minHeight: 50 }}>
              {car.model} {car.carBrand}
            </Typography>

            <Button variant="text" onClick={() => removeCar(car.id)} sx={{ width: '100%' }}>
              Видалити
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
