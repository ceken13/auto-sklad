import { Box, Typography, Chip } from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { calculateLoanRepayment } from '../../utils/calculateLoanRepayment';
import { getMediaUrl } from '../../utils/uploadImage';

export function TradeInDesiredCarCard({ car }) {
  const loanPayment = car?.loanRepayment ?? calculateLoanRepayment(car?.specialPrice || car?.regularPrice);
  return (
    <Box
      sx={{
        border: '1px solid #E6E6E6',
        borderRadius: 2,
        overflow: 'hidden',
        background: '#fff',
        width: '100%',
      }}
    >
      <Chip
        icon={<CheckCircleIcon />}
        label="БАЖАНИЙ АВТОМОБІЛЬ"
        sx={{
          mt: 2,
          bgcolor: '#3F9403',
          color: '#fff',
          fontWeight: 800,
          borderRadius: '0px 8px 8px 0px',
          '& .MuiChip-icon': {
            color: '#fff',
          },
        }}
      />

      <Box
        component="img"
        src={getMediaUrl(car?.imgCar)}
        sx={{
          width: '100%',
          objectFit: 'cover',
        }}
      />

      <Box p={3}>
        <Typography variant="h6" fontWeight={700} mb={2}>
          Основні характеристики:
        </Typography>
        {car?.carBrand && (
          <Box sx={{ display: 'flex', fontWeight: '600' }}>
            <Typography sx={{ mb: 1, flex: 1, fontSize: '18px' }}>Модель:</Typography>
            <Typography sx={{ mb: 1, flex: 1, fontSize: '18px' }}>
              {car?.carBrand} {car?.model}
            </Typography>
          </Box>
        )}

        {car?.year && (
          <Box sx={{ display: 'flex', fontWeight: '600' }}>
            <Typography sx={{ mb: 1, flex: 1, fontSize: '18px' }}>Рік випуску:</Typography>
            <Typography sx={{ mb: 1, flex: 1, fontSize: '18px' }}>{car?.year}</Typography>
          </Box>
        )}
        {car?.trimLevel && (
          <Box sx={{ display: 'flex', fontWeight: '600' }}>
            <Typography sx={{ mb: 1, flex: 1, fontSize: '18px' }}>Комплектація:</Typography>
            <Typography sx={{ mb: 1, flex: 1, fontSize: '18px' }}>{car?.trimLevel}</Typography>
          </Box>
        )}
        {car?.engine && (
          <Box sx={{ display: 'flex', fontWeight: '600' }}>
            <Typography sx={{ mb: 1, flex: 1, fontSize: '18px' }}>Двигун:</Typography>
            <Typography sx={{ mb: 1, flex: 1, fontSize: '18px' }}>{car?.engine}</Typography>
          </Box>
        )}
        {car?.fuelType && (
          <Box sx={{ display: 'flex', fontWeight: '600' }}>
            <Typography sx={{ mb: 1, flex: 1, fontSize: '18px' }}>Тип палива:</Typography>
            <Typography sx={{ mb: 1, flex: 1, fontSize: '18px' }}>{car?.fuelType}</Typography>
          </Box>
        )}
        {car?.driveType && (
          <Box sx={{ display: 'flex', fontWeight: '600' }}>
            <Typography sx={{ mb: 1, flex: 1, fontSize: '18px' }}>КПП:</Typography>
            <Typography sx={{ mb: 1, flex: 1, fontSize: '18px' }}>{car?.driveType}</Typography>
          </Box>
        )}

        <Box mt={3}>
          {car?.specialPrice && (
            <Box sx={{ display: 'flex', color: 'red', fontWeight: '600' }}>
              <Typography sx={{ mb: 1, flex: 1, fontSize: '18px' }}>Акційна ціна:</Typography>
              <Typography sx={{ mb: 1, flex: 1, fontSize: '18px', fontWeight: '900' }}>
                {car?.specialPrice?.toLocaleString('uk-UA')} грн
              </Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ mb: 1, flex: 1, fontSize: '18px' }}>Регулярна ціна:</Typography>
            <Typography
              sx={{
                mb: 1,
                flex: 1,
                fontSize: '18px',
                fontWeight: '900',
                textDecoration: car?.specialPrice ? 'line-through' : 'none',
              }}
            >
              {car?.regularPrice?.toLocaleString('uk-UA')} грн
            </Typography>
          </Box>

          {loanPayment && (
            <Box>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ mb: 1, flex: 1, color: '#cbcbcb' }}>Кредитний платіж:</Typography>

                <Typography sx={{ mb: 1, flex: 1, color: '#cbcbcb' }}>
                  {loanPayment.toLocaleString('uk-UA')} грн/міс.*
                </Typography>
              </Box>
              <Typography sx={{ color: '#999999', opacity: '0,5', fontSize: '14px', marginTop: '10px' }}>
                * під кредитним платежем мається на увазі розрахунок кредиту авто при умовах першого внеску - 70%,
                терміну виплати кредиту - 36 місяців, річна ставка - 0.01%. Розрахунок наведено орієнтовно.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default TradeInDesiredCarCard;
