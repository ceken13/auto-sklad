import { Box, Typography, Button, Stack } from '@mui/material';
import { useState } from 'react';
import { theme } from '../../theme';
import { getStyles } from './styles';
import { PickUpLabel } from './PickUpLabel';
import { SpecialOfferLabel } from './SpecialOfferLabel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';

export function CarBlockCard({ data }) {
  const styles = getStyles(theme);
  const navigate = useNavigate();

  return (
    <Box sx={styles.carItemWrap}>
      {/* LEFT SIDE */}
      <Box sx={{ maxWidth: { xs: '100%', sm: '320px' } }}>
        <Stack sx={styles.saleLabels}>
          {data?.pickUpOffer && <PickUpLabel />}

          {data?.specialOffer && <SpecialOfferLabel />}
        </Stack>

        <Box component="img" src={data?.imgCar} sx={styles.imgCar} />

        {data?.availablCar && (
          <Typography color="green" sx={{ fontSize: '14px' }}>
            В наявності
          </Typography>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '20px' }}>
          <LocationOnIcon sx={{ color: '#002C5E', fontSize: 20 }} />
          <Typography variant="body2" sx={{ fontSize: 14 }}>
            {data?.bealerName}, {data?.dealerSity}
          </Typography>
        </Box>
      </Box>

      {/* RIGHT SIDE */}
      <Box sx={{ flex: 1, paddingRight: '10%' }}>
        <Typography variant="h6" sx={{ mb: 1, fontFamily: 'HyundaiSansHeadMedium, sans-serif' }}>
          {data?.model} {data?.carBrand}
        </Typography>

        <Typography variant="body2" sx={{ fontSize: '14px', margin: '8px 0' }}>
          {data?.engine}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: '14px', margin: '8px 0' }}>
          Рік випуску: {data?.year}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          sx={{ margin: '30px 0 10px', display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography variant="body2" sx={{ fontSize: '14px', flex: 1 }}>
            Колір кузова:
          </Typography>

          <Typography variant="body2" sx={{ fontSize: '14px', margin: '8px 0', marginLeft: '0', flex: 1 }}>
            {data?.exteriorColor}
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ margin: '0px 0', display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ fontSize: '14px', margin: '8px 0', flex: 1 }}>
            Регулярна ціна:
          </Typography>
          <span style={{ fontSize: '18px', fontWeight: 700, flex: 1, fontFamily: 'HyundaiSansHeadMedium, sans-serif' }}>
            {data?.regularPrice} грн
          </span>
        </Stack>
        <Stack direction="row" sx={{ margin: '0px 0', display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '14px', margin: '8px 0', flex: 1 }}>
            Кредитний платіж:
          </Typography>
          <strong style={{ flex: 1, color: '#999999' }}>{data?.loanRepayment} грн/міс.*</strong>
        </Stack>

        <Button
          variant="contained"
          sx={{ mt: 2, width: '100%', maxWidth: '300px', marginTop: '60px' }}
          onClick={() => navigate(`/car-details/${data?.id}`)}
        >
          Детальніше
        </Button>
      </Box>
    </Box>
  );
}

export default CarBlockCard;
