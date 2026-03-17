import { Box, Typography, Button, Stack } from '@mui/material';
import { useState } from 'react';
import { theme } from '../../theme';
import { getStyles } from './styles';
import { PickUpLabel } from './PickUpLabel';
import { SpecialOfferLabel } from './SpecialOfferLabel';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export function CarBlockCard({
  model,
  imgCar,
  bealerName,
  dealerSity,
  carBrand,
  engine,
  year,
  exteriorColor,
  regularPrice,
  loanRepayment,
  specialOffer,
  pickUpOffer,
  availablCar,
}) {
  const styles = getStyles(theme);

  return (
    <Box sx={styles.carItemWrap}>
      {/* LEFT SIDE */}
      <Box sx={{ width: 320 }}>
        <Stack sx={styles.saleLabels}>
          {pickUpOffer && <PickUpLabel />}

          {specialOffer && <SpecialOfferLabel />}
        </Stack>

        <Box component="img" src={imgCar} sx={styles.imgCar} />

        {availablCar && (
          <Typography color="green" sx={{ fontSize: '14px' }}>
            В наявності
          </Typography>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '20px' }}>
          <LocationOnIcon sx={{ color: '#006A5D', fontSize: 20 }} />
          <Typography variant="body2" sx={{ fontSize: 14 }}>
            {bealerName}, {dealerSity}
          </Typography>
        </Box>
      </Box>

      {/* RIGHT SIDE */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {model} {carBrand}
        </Typography>

        <Typography variant="body2" sx={{ fontSize: '14px', margin: '8px 0' }}>
          {engine}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: '14px', margin: '8px 0' }}>
          Рік випуску: {year}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ fontSize: '14px', margin: '30px 0' }}>
          <Typography variant="body2" sx={{ fontSize: '14px' }}>
            Колір кузова:
          </Typography>

          <Typography variant="body2" sx={{ fontSize: '14px', margin: '8px 0' }}>
            {exteriorColor}
          </Typography>
        </Stack>

        <Typography variant="body2" sx={{ fontSize: '14px', margin: '8px 0' }}>
          Регулярна ціна:
          <span style={{ fontSize: '18px', fontWeight: 700, marginLeft: '10px' }}>{regularPrice} грн</span>
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '14px', margin: '8px 0' }}>
          Кредитний платіж: <strong>{loanRepayment} грн/міс.*</strong>
        </Typography>

        <Button variant="contained" sx={{ mt: 2, width: '100%', marginTop: '60px' }}>
          Детальніше
        </Button>
      </Box>
    </Box>
  );
}

export default CarBlockCard;
