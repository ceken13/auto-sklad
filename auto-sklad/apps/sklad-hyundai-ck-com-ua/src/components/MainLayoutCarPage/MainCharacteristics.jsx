import { theme } from '../../theme.ts';
import { getStyles } from './styles';
import { Box, Typography } from '@mui/material';
import { calculateLoanRepayment } from '../../utils/calculateLoanRepayment';

export function MainCharacteristics({ car }) {
  const styles = getStyles(theme);

  const loanPayment = car?.loanRepayment ?? calculateLoanRepayment(car?.specialPrice || car?.regularPrice);

  return (
    <Box>
      <Box>
        {/* Статус */}
        {car?.availableCar && (
          <Typography color="green" sx={{ fontSize: '24px', fontFamily: 'HyundaiSansHeadLight, sans-serif' }}>
            В наявності
          </Typography>
        )}

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
          Основні характеристики:
        </Typography>

        {/* Характеристики */}
        <Box sx={{ marginBottom: '40px' }}>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ mb: 1, flex: 1 }}>Модель:</Typography>
            <Typography sx={{ mb: 1, flex: 1, fontWeight: '800' }}>
              {car?.carBrand} {car?.model}
            </Typography>
          </Box>

          {car?.exteriorColor && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Колір кузова:</Typography>
              <Typography sx={{ mb: 1, flex: 1, fontWeight: '800' }}>{car?.exteriorColor}</Typography>
            </Box>
          )}
          {car?.year && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Рік випуску:</Typography>
              <Typography sx={{ mb: 1, flex: 1, fontWeight: '800' }}>{car?.year}</Typography>
            </Box>
          )}
          {car?.kilometrage && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Пробіг:</Typography>
              <Typography sx={{ mb: 1, flex: 1, fontWeight: '800' }}>{car?.kilometrage} км</Typography>
            </Box>
          )}

          {car?.trimLevel && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Комплектація:</Typography>
              <Typography sx={{ mb: 1, flex: 1, fontWeight: '800' }}>{car?.trimLevel}</Typography>
            </Box>
          )}
          {car?.engine && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Двигун:</Typography>
              <Typography sx={{ mb: 1, flex: 1, fontWeight: '800' }}>{car?.engine}</Typography>
            </Box>
          )}
          {car?.fuelType && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Тип палива:</Typography>
              <Typography sx={{ mb: 1, flex: 1, fontWeight: '800' }}>{car?.fuelType}</Typography>
            </Box>
          )}
          {car?.transmission && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>КПП:</Typography>
              <Typography sx={{ mb: 1, flex: 1, fontWeight: '800' }}>{car?.transmission}</Typography>
            </Box>
          )}
        </Box>

        {/* Ціна */}
        <Box sx={{ marginBottom: '40px' }}>
          {car?.specialPrice && (
            <Box sx={{ display: 'flex', color: 'red', fontWeight: '600' }}>
              <Typography sx={{ mb: 1, flex: 1 }}>Акційна ціна:</Typography>
              <Typography
                sx={{
                  mb: 1,
                  fontFamily: 'HyundaiSansHeadRegular, sans-serif',
                  flex: 1,
                  fontSize: '22px',
                  fontWeight: '700',
                }}
              >
                {car?.specialPrice?.toLocaleString('uk-UA')} грн
              </Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ mb: 1, flex: 1 }}>Регулярна ціна:</Typography>
            <Typography
              sx={{
                mb: 1,
                flex: 1,
                fontSize: '22px',
                fontWeight: '700',
                fontFamily: 'HyundaiSansHeadRegular, sans-serif',
                textDecoration: car?.specialPrice ? 'line-through' : 'none',
              }}
            >
              {car?.regularPrice?.toLocaleString('uk-UA')} грн
            </Typography>
          </Box>
          {loanPayment && (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mb: 1, flex: 1, color: '#cbcbcb' }}>Кредитний платіж:</Typography>

              <Typography sx={{ mb: 1, flex: 1, color: '#cbcbcb', fontFamily: 'HyundaiSansHeadRegular, sans-serif' }}>
                {loanPayment.toLocaleString('uk-UA')} грн/міс.*
              </Typography>
            </Box>
          )}
          <Typography sx={styles.textUnderSlider}>
            * під кредитним платежем мається на увазі розрахунок кредиту авто при умовах першого внеску - 70%, терміну
            виплати кредиту - 36 місяців, річна ставка - 0.01%. Розрахунок наведено орієнтовно.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default MainCharacteristics;
