import { Box, Typography, Button, Stack } from '@mui/material';
import { useState } from 'react';
import { theme } from '../../theme';
import { getStyles } from './styles';
import { PickUpLabel } from './PickUpLabel';
import { SpecialOfferLabel } from './SpecialOfferLabel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import { getMediaUrl } from '../../utils/uploadImage';
import BalanceIcon from '@mui/icons-material/Balance';
import { useCompare } from '../../context/CompareContext';
import { calculateLoanRepayment } from '../../utils/calculateLoanRepayment';

export function CarBlockCard({ data }) {
  const styles = getStyles(theme);
  const navigate = useNavigate();
  const { compareCars, toggleCompare } = useCompare();

  const isCompare = compareCars.some((item) => item.id === data.id);
  const loanPayment = data?.loanRepayment ?? calculateLoanRepayment(data?.specialPrice || data?.regularPrice);
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
        <Box sx={{ mb: 1, display: 'flex', gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {data?.model} {data?.carBrand}
          </Typography>
          {data?.tradeIn && (
            <Typography
              sx={{
                background: '#000',
                color: '#fff',
                borderRadius: '4px',
                padding: '2px 4px',
                fontSize: '12px',
                textAlign: 'center',
              }}
            >
              TRADE IN
            </Typography>
          )}
        </Box>
        {data?.engine && (
          <Typography variant="body2" sx={{ fontSize: '14px', margin: '8px 0' }}>
            {data?.engine}
          </Typography>
        )}
        {data?.year && (
          <Typography variant="body2" sx={{ fontSize: '14px', margin: '8px 0' }}>
            Рік випуску: {data?.year}
          </Typography>
        )}
        {data?.kilometrage && (
          <Typography variant="body2" sx={{ fontSize: '14px', margin: '8px 0' }}>
            Пробіг: {data?.kilometrage} км
          </Typography>
        )}
        {data?.trimLevel && (
          <Typography variant="body2" sx={{ fontSize: '14px', margin: '8px 0' }}>
            Комплектація: {data?.trimLevel}
          </Typography>
        )}
        {data?.exteriorColor && (
          <Stack direction="row" spacing={1} alignItems="center" sx={{ fontSize: '14px', margin: '30px 0' }}>
            <Typography variant="body2" sx={{ fontSize: '14px' }}>
              Колір кузова:
            </Typography>

            <Typography variant="body2" sx={{ fontSize: '14px', margin: '8px 0' }}>
              {data?.exteriorColor}
            </Typography>
          </Stack>
        )}

        {data?.specialPrice && (
          <Typography variant="body2" sx={{ fontSize: '14px', margin: '8px 0', color: 'red', fontWeight: '600' }}>
            Акційна ціна:
            <span style={{ fontSize: '18px', fontWeight: 700, marginLeft: '10px' }}>
              {data?.specialPrice?.toLocaleString('uk-UA')} грн
            </span>
          </Typography>
        )}

        <Typography variant="body2" sx={{ fontSize: '14px', margin: '8px 0' }}>
          Регулярна ціна:
          <span
            style={{
              fontSize: '18px',
              fontWeight: 700,
              marginLeft: '10px',
              textDecoration: data?.specialPrice ? 'line-through' : 'none',
            }}
          >
            {data?.regularPrice?.toLocaleString('uk-UA')} грн
          </span>
        </Typography>

        {loanPayment && (
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '14px', margin: '8px 0' }}>
            Кредитний платіж: <strong>{loanPayment.toLocaleString('uk-UA')} грн/міс.</strong>
          </Typography>
        )}

        <Button
          variant="contained"
          sx={{ mt: 2, width: '100%', marginTop: '60px' }}
          onClick={() => navigate(`/car-details/${data?.id}`)}
        >
          Детальніше
        </Button>

        <Box
          onClick={() => toggleCompare(data)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: 'pointer',
            marginTop: '16px',
            color: isCompare ? '#999' : '#000',
            transition: '0.2s',
          }}
        >
          <BalanceIcon fontSize="medium" />

          <Typography
            sx={{
              fontSize: '14px',
              color: 'inherit',
            }}
          >
            {isCompare ? 'Прибрати з порівняння' : 'Порівняти'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default CarBlockCard;
