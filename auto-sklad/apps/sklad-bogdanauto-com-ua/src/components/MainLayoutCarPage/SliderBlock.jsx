import { theme } from '../../theme.ts';
import { getStyles } from './styles';
import Typography from '@mui/material/Typography';
import { Box, IconButton, Dialog } from '@mui/material';
import { useState } from 'react';
import { PickUpLabel } from '../SortingCarBlock/PickUpLabel';
import { SpecialOfferLabel } from '../SortingCarBlock/SpecialOfferLabel';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getMediaUrl } from '../../utils/uploadImage';

export function SliderBlock({ car }) {
  const styles = getStyles(theme);
  const [current, setCurrent] = useState(0);
  const [openImage, setOpenImage] = useState(false);
  const toMediaUrl = (url) => {
    if (!url) return '/images/car-placeholder.jpg';
    if (url.startsWith('http')) return url;
    return getMediaUrl(url);
  };

  const images = [toMediaUrl(car?.imgCar), ...(car?.sliderImages || []).map(toMediaUrl)];

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box>
      <Box sx={styles.sliderWrap}>
        {car?.pickUpOffer && <PickUpLabel />}
        {car?.specialOffer && <SpecialOfferLabel />}

        <Box sx={{ padding: '40px 50px 20px' }}>
          {/* Зображення */}
          <Box
            component="img"
            src={images[current] || '/images/car-placeholder.jpg'}
            onClick={() => setOpenImage(true)}
            onError={(e) => {
              e.currentTarget.src = '/images/car-placeholder.jpg';
            }}
            sx={styles.imgSlider}
          />
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
            {images.map((_, index) => (
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
      <Dialog open={openImage} onClose={() => setOpenImage(false)} maxWidth="lg">
        <Box
          component="img"
          src={images[current]}
          sx={{
            width: '100%',
            maxWidth: '1200px',
            maxHeight: '90vh',
            objectFit: 'contain',
          }}
        />
      </Dialog>
    </Box>
  );
}

export default SliderBlock;
