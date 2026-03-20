import { theme } from '../../theme.ts';
import { getStyles } from './styles';
import Typography from '@mui/material/Typography';
import { Box, IconButton } from '@mui/material';
import { useState } from 'react';
import { PickUpLabel } from '../SortingCarBlock/PickUpLabel';
import { SpecialOfferLabel } from '../SortingCarBlock/SpecialOfferLabel';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const slides = [
  'https://bogdanauto.com.ua/wp-content/uploads/2025/10/Frame-31945-3-2.jpg',
  'https://bogdanauto.com.ua/wp-content/themes/bah-theme/images/h5/img5.jpg',
  'https://bogdanauto.com.ua/wp-content/themes/bah-theme/images/h5/img2.jpg',
  'https://bogdanauto.com.ua/wp-content/themes/bah-theme/images/h5/img1.jpg',
];

export function SliderBlock() {
  const styles = getStyles(theme);
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box>
      <Box sx={styles.sliderWrap}>
        <PickUpLabel />
        <SpecialOfferLabel />
        <Box sx={{ padding: '40px 50px 20px' }}>
          {/* Зображення */}
          <Box component="img" src={slides[current]} sx={styles.imgSlider} />

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
            {slides.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrent(index)}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: current === index ? '#ff6d00' : '#ccc',
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
