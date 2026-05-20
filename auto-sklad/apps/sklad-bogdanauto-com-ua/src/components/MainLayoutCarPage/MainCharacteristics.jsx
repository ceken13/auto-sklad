import { theme } from '../../theme.ts';
import { getStyles } from './styles';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function MainCharacteristics({ car }) {
  const styles = getStyles(theme);
  const navigate = useNavigate();

  return (
    <Box>
      <Box>
        <Typography> id = {car?.id} </Typography>
        {/* Статус */}
        {car?.availableCar && (
          <Typography color="green" sx={{ fontSize: '24px' }}>
            В наявності
          </Typography>
        )}

        {/* Заголовок */}
        <Typography variant="h6" sx={{ marginBottom: '30px', fontWeight: 600, fontSize: '24px' }}>
          Основні характеристики:
        </Typography>

        {/* Характеристики */}
        <Box sx={{ marginBottom: '40px' }}>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ mb: 1, flex: 1 }}>Модель:</Typography>
            <Typography sx={{ mb: 1, flex: 1 }}>
              {car?.carBrand} {car?.model}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ mb: 1, flex: 1 }}>Колір кузова:</Typography>
            <Typography sx={{ mb: 1, flex: 1 }}>{car?.exteriorColor}</Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ mb: 1, flex: 1 }}>Рік випуску:</Typography>
            <Typography sx={{ mb: 1, flex: 1 }}>{car?.year}</Typography>
          </Box>

          {car?.trimLevel && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Комплектація:</Typography>
              <Typography sx={{ mb: 1, flex: 1 }}>{car?.trimLevel}</Typography>
            </Box>
          )}
          {car?.engine && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Двигун:</Typography>
              <Typography sx={{ mb: 1, flex: 1 }}>{car?.engine}</Typography>
            </Box>
          )}
          {car?.fuelType && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Тип палива:</Typography>
              <Typography sx={{ mb: 1, flex: 1 }}>{car?.fuelType}</Typography>
            </Box>
          )}
          {car?.fuelType && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>КПП:</Typography>
              <Typography sx={{ mb: 1, flex: 1 }}>{car?.transmission}</Typography>
            </Box>
          )}
        </Box>

        {/* Ціна */}
        <Box sx={{ marginBottom: '40px' }}>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ mb: 1, flex: 1 }}>Регулярна ціна:</Typography>
            <Typography sx={{ mb: 1, flex: 1, fontSize: '22px', fontWeight: '700' }}>
              {car?.regularPrice?.toLocaleString('uk-UA')} грн
            </Typography>
          </Box>
          {car?.loanRepayment && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1, color: '#cbcbcb' }}>Кредитний платіж:</Typography>
              <Typography sx={{ mb: 1, flex: 1, color: '#cbcbcb' }}>{car?.loanRepayment} грн/міс.*</Typography>
            </Box>
          )}
        </Box>

        {/* Кнопка */}
        <Button
          fullWidth
          sx={{
            backgroundColor: '#0f6b5c',
            color: '#fff',
            padding: '12px',
            borderRadius: '6px',
            textTransform: 'none',
            width: '100%',
          }}
          onClick={() => navigate(`/car-request/${car?.id}`)}
        >
          Подати запит на авто
        </Button>
      </Box>
    </Box>
  );
}

export default MainCharacteristics;
