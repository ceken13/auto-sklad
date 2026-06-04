import { Box, Typography, Button, Stack } from '@mui/material';
import { useState } from 'react';
import { theme } from '../../theme';
import { getStyles } from './styles';
import { PickUpLabel } from './PickUpLabel';
import { SpecialOfferLabel } from './SpecialOfferLabel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import { getMediaUrl } from '../../utils/uploadImage';

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

        <Box
          component="img"
          src={getMediaUrl(data?.imgCar) || '/images/car-placeholder.jpg'}
          onError={(e) => {
            e.currentTarget.src = '/images/car-placeholder.jpg';
          }}
          sx={styles.imgCar}
        />

        {data?.availableCar && (
          <Typography color="green" sx={{ fontSize: '14px' }}>
            В наявності
          </Typography>
        )}

        {(data?.dealerName || data?.dealerCity) && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '20px' }}>
            <LocationOnIcon sx={{ color: '#006A5D', fontSize: 20 }} />
            <Typography variant="body2" sx={{ fontSize: 14 }}>
              {data?.dealerName}
              {data?.dealerName && data?.dealerCity ? ', ' : ''}
              {data?.dealerCity}
            </Typography>
          </Box>
        )}
      </Box>

      {/* RIGHT SIDE */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {data?.model} {data?.carBrand}
        </Typography>

        <Typography variant="body2" sx={{ fontSize: '14px', margin: '8px 0' }}>
          {data?.engine}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: '14px', margin: '8px 0' }}>
          Рік випуску: {data?.year}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ fontSize: '14px', margin: '30px 0' }}>
          <Typography variant="body2" sx={{ fontSize: '14px' }}>
            Колір кузова:
          </Typography>

          <Typography variant="body2" sx={{ fontSize: '14px', margin: '8px 0' }}>
            {data?.exteriorColor}
          </Typography>
        </Stack>

        <Typography variant="body2" sx={{ fontSize: '14px', margin: '8px 0' }}>
          Регулярна ціна:
          <span style={{ fontSize: '18px', fontWeight: 700, marginLeft: '10px' }}>
            {data?.regularPrice?.toLocaleString('uk-UA')} грн
          </span>
        </Typography>

        {data?.loanRepayment != null && (
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '14px', margin: '8px 0' }}>
            Кредитний платіж: <strong>{data?.loanRepayment} грн/міс.*</strong>
          </Typography>
        )}
        <Button
          variant="contained"
          sx={{ mt: 2, width: '100%', marginTop: '60px' }}
          onClick={() => navigate(`/car-details/${data?.id}`)}
        >
          Детальніше
        </Button>
      </Box>
    </Box>
  );
}

export default CarBlockCard;
