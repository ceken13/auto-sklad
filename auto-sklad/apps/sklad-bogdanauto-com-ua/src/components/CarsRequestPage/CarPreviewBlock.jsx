import { theme } from '../../theme.ts';
import { getStyles } from './styles';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useState } from 'react';

export function CarPreviewBlock({ car, onSubmit }) {
  const styles = getStyles(theme);

  return (
    <Box>
      <Box sx={styles.previewBlockWrap}>
        {/* Статус */}
        {car?.availablCar && (
          <Typography color="green" sx={{ fontSize: '20px' }}>
            В наявності
          </Typography>
        )}

        <Box component="img" src={car?.imgCar} sx={{ maxWidth: '100%' }} />
        <Box>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ mb: 1, flex: 1, fontSize: '20px', fontWeight: '600' }}>
              {car?.carBrand} {car?.model} {car?.trimLevel}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ mb: 1, flex: 1, fontSize: '18px' }}>Регулярна ціна:</Typography>
            <Typography sx={{ mb: 1, flex: 1, fontSize: '18px', fontWeight: '900' }}>
              {car?.regularPrice} грн
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* Кнопка */}
      <Button
        type="submit"
        fullWidth
        sx={{
          backgroundColor: '#0f6b5c',
          color: '#fff',
          padding: '12px',
          borderRadius: '6px',
          textTransform: 'none',
          width: '100%',
        }}
      >
        Додати в кошик
      </Button>
    </Box>
  );
}

export default CarPreviewBlock;
