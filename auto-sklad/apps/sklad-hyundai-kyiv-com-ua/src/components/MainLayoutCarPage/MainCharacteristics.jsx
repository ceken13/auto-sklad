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
        {/* Статус */}
        {car?.availableCar && (
          <Typography color="green" sx={{ fontSize: '24px', fontFamily: 'HyundaiSansHeadLight, sans-serif' }}>
            В наявності
          </Typography>
        )}

        {/* Заголовок */}
        <Typography
          variant="h6"
          sx={{
            marginBottom: '30px',
            fontWeight: 600,
            fontSize: '24px',
            fontFamily: 'HyundaiSansHeadRegular, sans-serif',
          }}
        >
          Основні характеристики:
        </Typography>

        {/* Характеристики */}
        <Box sx={{ marginBottom: '40px' }}>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ mb: 1, flex: 1 }}>Модель:</Typography>
            <Typography sx={{ mb: 1, flex: 1, fontWeight: '800' }}>
              {car?.carBrand} {car?.model}
            </Typography>
          </Box>
          {car?.exteriorColor && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Колір кузова:</Typography>
              <Typography sx={{ mb: 1, flex: 1, fontWeight: '800' }}>{car?.exteriorColor}</Typography>
            </Box>
          )}
          {car?.year && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Рік випуску:</Typography>
              <Typography sx={{ mb: 1, flex: 1, fontWeight: '800' }}>{car?.year}</Typography>
            </Box>
          )}

          {car?.trimLevel && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Комплектація:</Typography>
              <Typography sx={{ mb: 1, flex: 1, fontWeight: '800' }}>{car?.trimLevel}</Typography>
            </Box>
          )}
          {car?.engine && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Двигун:</Typography>
              <Typography sx={{ mb: 1, flex: 1, fontWeight: '800' }}>{car?.engine}</Typography>
            </Box>
          )}
          {car?.fuelType && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Тип палива:</Typography>
              <Typography sx={{ mb: 1, flex: 1, fontWeight: '800' }}>{car?.fuelType}</Typography>
            </Box>
          )}
          {car?.fuelType && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>КПП:</Typography>
              <Typography sx={{ mb: 1, flex: 1, fontWeight: '800' }}>{car?.transmission}</Typography>
            </Box>
          )}
        </Box>

        {/* Ціна */}
        <Box sx={{ marginBottom: '40px' }}>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ mb: 1, flex: 1 }}>Регулярна ціна:</Typography>
            <Typography
              sx={{
                mb: 1,
                flex: 1,
                fontSize: '22px',
                fontWeight: '700',
                fontFamily: 'HyundaiSansHeadRegular, sans-serif',
              }}
            >
              {car?.regularPrice?.toLocaleString('uk-UA')} грн
            </Typography>
          </Box>
          {car?.loanRepayment && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1, color: '#cbcbcb' }}>Кредитний платіж:</Typography>
              <Typography sx={{ mb: 1, flex: 1, color: '#cbcbcb', fontFamily: 'HyundaiSansHeadRegular, sans-serif' }}>
                {car?.loanRepayment} грн/міс.*
              </Typography>
            </Box>
          )}
        </Box>

        {/* Кнопка */}
        <Button
          fullWidth
          sx={{
            backgroundColor: '#002C5E',
            color: '#fff',
            padding: '12px',
            borderRadius: '0px',
            textTransform: 'none',
            width: '100%',
            fontFamily: 'HyundaiSansHeadRegular, sans-serif',
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
