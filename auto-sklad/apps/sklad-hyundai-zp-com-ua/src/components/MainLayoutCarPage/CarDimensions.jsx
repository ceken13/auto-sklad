import { theme } from '../../theme.ts';
import { getStyles } from './styles';
import { Box, Typography } from '@mui/material';

export function CarDimensions({ car }) {
  const styles = getStyles(theme);

  return (
    <Box>
      <Box>
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
          Габарити авто:
        </Typography>

        {/* Довжина, мм */}
        <Box>
          {car?.lengthMm && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Довжина, мм:</Typography>
              <Typography sx={{ mb: 1, flex: 1, fontWeight: 600 }}>{car?.lengthMm}</Typography>
            </Box>
          )}
        </Box>
        {/* Ширина, мм */}
        <Box>
          {car?.widthMm && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Ширина, мм:</Typography>
              <Typography sx={{ mb: 1, flex: 1, fontWeight: 600 }}>{car?.widthMm}</Typography>
            </Box>
          )}
        </Box>
        {/* Висота, мм */}
        <Box>
          {car?.heightMm && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Висота, мм:</Typography>
              <Typography sx={{ mb: 1, flex: 1, fontWeight: 600 }}>{car?.heightMm}</Typography>
            </Box>
          )}
        </Box>
        {/* Колісна база, мм */}
        <Box>
          {car?.wheelbaseMm && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Колісна база, мм:</Typography>
              <Typography sx={{ mb: 1, flex: 1, fontWeight: 600 }}>{car?.wheelbaseMm}</Typography>
            </Box>
          )}
        </Box>
        {/* Споряджена маса, кг */}
        <Box>
          {car?.curbWeightKg && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Споряджена маса, кг:</Typography>
              <Typography sx={{ mb: 1, flex: 1, fontWeight: 600 }}>{car?.curbWeightKg}</Typography>
            </Box>
          )}
        </Box>
        {/* Повна маса, кг */}
        <Box>
          {car?.grossWeightKg && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Повна маса, кг:</Typography>
              <Typography sx={{ mb: 1, flex: 1, fontWeight: 600 }}>{car?.grossWeightKg}</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default CarDimensions;
