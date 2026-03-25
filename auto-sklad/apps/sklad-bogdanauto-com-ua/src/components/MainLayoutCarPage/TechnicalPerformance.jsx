import { theme } from '../../theme.ts';
import { getStyles } from './styles';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useState } from 'react';

export function TechnicalPerformance({ car }) {
  const styles = getStyles(theme);

  return (
    <Box>
      <Box>
        {/* Заголовок */}
        <Typography variant="h6" sx={{ marginBottom: '30px', fontWeight: 600, fontSize: '24px' }}>
          Технічні характеристики:
        </Typography>

        {/* Характеристики */}
        <Box sx={{ marginBottom: '40px' }}>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ mb: 1, flex: 1 }}>Модель:</Typography>
            <Typography sx={{ mb: 1, flex: 1 }}>
              {car?.carBrand} {car?.model}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TechnicalPerformance;
