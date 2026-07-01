import { theme } from '../../theme.ts';
import { getStyles } from './styles';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';

export function TechnicalPerformance({ car }) {
  const styles = getStyles(theme);

  return (
    <Box>
      <Box>
        {/* Заголовок */}
        {(car?.cityFuelConsumption ||
          car?.highwayFuelConsumption ||
          car?.combinedFuelConsumption ||
          car?.enginePowerHP ||
          car?.accel0to100 ||
          car?.maximumSpeed ||
          car?.fuelTankCapacity ||
          car?.coEmissions ||
          car?.driveType) && (
          <Typography
            variant="h6"
            sx={{
              marginBottom: '30px',
              fontWeight: 600,
              fontSize: '24px',
              fontFamily: 'HyundaiSansHeadRegular, sans-serif',
            }}
          >
            Технічні характеристики:
          </Typography>
        )}
        {/* Характеристики */}
        <Box>
          {car?.enginePowerHP && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Потужність (к.с./об.хв.):</Typography>
              <Typography sx={{ mb: 1, flex: 1, fontWeight: 600 }}>{car?.enginePowerHP}</Typography>
            </Box>
          )}
        </Box>
        <Box>
          {car?.accel0to100 && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Розгін від 0 до 100 км/год, с:</Typography>
              <Typography sx={{ mb: 1, flex: 1, fontWeight: 600 }}>{car?.accel0to100}</Typography>
            </Box>
          )}
        </Box>
        <Box>
          {car?.maximumSpeed && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Максимальна швидкість, км/год:</Typography>
              <Typography sx={{ mb: 1, flex: 1, fontWeight: 600 }}>{car?.maximumSpeed}</Typography>
            </Box>
          )}
        </Box>

        <Box>
          {car?.cityFuelConsumption && car?.highwayFuelConsumption && car?.combinedFuelConsumption && (
            <Box sx={{ mb: 1 }}>
              <Typography sx={{ mb: 1 }}>Витрати пального:</Typography>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ mb: 1, flex: 1, pl: 2 }}> • Міський цикл</Typography>
                <Typography sx={{ mb: 1, flex: 1, fontWeight: 600 }}>{car?.cityFuelConsumption}</Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ mb: 1, flex: 1, pl: 2 }}> • Заміський цикл</Typography>
                <Typography sx={{ mb: 1, flex: 1, fontWeight: 600 }}>{car?.highwayFuelConsumption}</Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ mb: 1, flex: 1, pl: 2 }}> • Комбінований цикл</Typography>
                <Typography sx={{ mb: 1, flex: 1, fontWeight: 600 }}>{car?.combinedFuelConsumption}</Typography>
              </Box>
            </Box>
          )}
        </Box>

        <Box>
          {car?.fuelTankCapacity && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Паливний бак, л:</Typography>
              <Typography sx={{ mb: 1, flex: 1, fontWeight: 600 }}>{car?.fuelTankCapacity}</Typography>
            </Box>
          )}
        </Box>
        <Box>
          {car?.driveType && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Привід:</Typography>
              <Typography sx={{ mb: 1, flex: 1, fontWeight: 600 }}>{car?.driveType}</Typography>
            </Box>
          )}
        </Box>
        <Box>
          {car?.coEmissions && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Викиди СО2, г/км**:</Typography>
              <Typography sx={{ mb: 1, flex: 1 }}>{car?.coEmissions}</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default TechnicalPerformance;
