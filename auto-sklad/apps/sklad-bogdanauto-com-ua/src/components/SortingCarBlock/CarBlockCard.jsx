import { Box, Typography, Button, Stack } from '@mui/material';
import { useState } from 'react';
import { theme } from '../../theme';
import { getStyles } from './styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export function CarBlockCard() {
  const styles = getStyles(theme);
  return (
    <Box sx={styles.carItemWrap}>
      {/* LEFT SIDE */}
      <Box sx={{ width: 320 }}>
        <Stack sx={styles.saleLabels}>
          <Box sx={styles.pickUpLabel}>
            <AccessTimeIcon sx={styles.icon} />
            Забрати за 60 хвилин
          </Box>

          <Box sx={styles.specialOfferLabel}>
            <ThumbUpIcon sx={styles.icon} />
            Спеціальна пропозиція
          </Box>
        </Stack>

        <Box
          component="img"
          src="https://bogdanauto.com.ua/wp-content/uploads/2025/10/Frame-31945-3-2.jpg"
          sx={styles.imgCar}
        />

        <Typography color="green" sx={{ fontSize: '14px' }}>
          В наявності
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '20px' }}>
          <LocationOnIcon sx={{ color: '#006A5D', fontSize: 20 }} />
          <Typography variant="body2">Богдан-Авто Луцьк, м.Луцьк</Typography>
        </Box>
      </Box>

      {/* RIGHT SIDE */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          HAVAL H5
        </Typography>

        <Typography variant="body2" sx={{ fontSize: '14px', margin: '8px 0' }}>
          2.0 D
        </Typography>
        <Typography variant="body2" sx={{ fontSize: '14px', margin: '8px 0' }}>
          Рік випуску: 2025
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ fontSize: '14px', margin: '30px 0' }}>
          <Typography variant="body2" sx={{ fontSize: '14px' }}>
            Колір кузова:
          </Typography>

          <Typography variant="body2" sx={{ fontSize: '14px', margin: '8px 0' }}>
            CX Purple
          </Typography>
        </Stack>

        <Typography variant="body2" sx={{ fontSize: '14px', margin: '8px 0' }}>
          Регулярна ціна:
          <span style={{ fontSize: '18px', fontWeight: 700, marginLeft: '10px' }}>1 595 000 грн</span>
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '14px', margin: '8px 0' }}>
          Кредитний платіж: <strong>9600 грн/міс.*</strong>
        </Typography>

        <Button variant="contained" sx={{ mt: 2, width: '100%', marginTop: '60px' }}>
          Детальніше
        </Button>
      </Box>
    </Box>
  );
}

export default CarBlockCard;
