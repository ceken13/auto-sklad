import { theme } from '../../theme.ts';
import { getStyles } from './styles';
import Typography from '@mui/material/Typography';
import { Box, IconButton } from '@mui/material';
import { useState } from 'react';
import { PickUpLabel } from '../SortingCarBlock/PickUpLabel';
import { SpecialOfferLabel } from '../SortingCarBlock/SpecialOfferLabel';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export function SliderBlock({ car }) {
  const styles = getStyles(theme);
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? car?.sliderImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === car?.sliderImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box>
      <Box sx={styles.sliderWrap}>
        {car?.pickUpOffer && <PickUpLabel />}
        {car?.specialOffer && <SpecialOfferLabel />}

        <Box sx={{ padding: '40px 50px 20px' }}>
          {/* Зображення */}
          <Box component="img" src={car?.sliderImages[current]} sx={styles.imgSlider} />

          {/* Ліва стрілка */}
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              top: '50%',
              left: 10,
              transform: 'translateY(-50%)',
              backgroundColor: '#fff',
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          {/* Права стрілка */}
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              top: '50%',
              right: 10,
              transform: 'translateY(-50%)',
              backgroundColor: '#fff',
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>

          {/* Dots */}
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              mt: 2,
              marginTop: '40px',
              justifyContent: 'flex-start',
            }}
          >
            {car?.sliderImages.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrent(index)}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: current === index ? '#43B0D4' : '#ccc',
                  cursor: 'pointer',
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
      <Typography sx={styles.textUnderSlider}>
        * під кредитним платежем мається на увазі розрахунок кредиту авто при умовах першого внеску - 70%, терміну
        виплати кредиту - 36 місяців, річна ставка - 0.01%.
      </Typography>
    </Box>
  );
}

export default SliderBlock;
