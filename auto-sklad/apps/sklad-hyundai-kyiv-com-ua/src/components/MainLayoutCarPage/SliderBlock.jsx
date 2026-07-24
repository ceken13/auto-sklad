import { theme } from '../../theme.ts';
import { getStyles } from './styles';
import Typography from '@mui/material/Typography';
import { Box, IconButton, Dialog, Button } from '@mui/material';
import { useState } from 'react';
import { PickUpLabel } from '../SortingCarBlock/PickUpLabel';
import { SpecialOfferLabel } from '../SortingCarBlock/SpecialOfferLabel';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getMediaUrl } from '../../utils/uploadImage';
import { useNavigate } from 'react-router-dom';
import TestDriveModal from '../TestDriveModal/TestDriveModal';

export function SliderBlock({ car }) {
  const navigate = useNavigate();
  const styles = getStyles(theme);
  const [current, setCurrent] = useState(0);
  const [openTestDrive, setOpenTestDrive] = useState(false);
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
                  backgroundColor: current === index ? '#43B0D4' : '#ccc',
                  cursor: 'pointer',
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
      {/* Кнопка */}
      <Button
        fullWidth
        sx={{
          backgroundColor: '#002C5E',
          color: '#fff',
          padding: '12px',
          borderRadius: '0px',
          textTransform: 'none',
          width: '100%',
          fontFamily: 'HyundaiSansHeadRegular, sans-serif',
          mt: 4,
        }}
        onClick={() => navigate(`/car-request/${car?.id}`)}
      >
        Подати запит на авто
      </Button>
      <Button
        fullWidth
        variant="outlined"
        sx={{
          mt: 2,
          borderColor: '#002C5E',
          color: '#002C5E',
          padding: '12px',
          textTransform: 'none',
          width: '100%',
        }}
        onClick={() => setOpenTestDrive(true)}
      >
        Тест-драйв
      </Button>
      <Dialog open={openImage} onClose={() => setOpenImage(false)} maxWidth="xl">
        <Box
          sx={{
            position: 'relative',
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
          }}
        >
          {/* Ліва стрілка */}
          {images.length > 1 && (
            <IconButton
              onClick={handlePrev}
              sx={{
                position: 'absolute',
                left: 20,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.8)',
                zIndex: 10,
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          )}

          {/* Фото */}
          <Box
            component="img"
            src={images[current]}
            sx={{
              maxWidth: '95vw',
              maxHeight: '90vh',
              objectFit: 'contain',
            }}
          />

          {/* Права стрілка */}
          {images.length > 1 && (
            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                right: 20,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.8)',
                zIndex: 10,
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          )}
        </Box>
      </Dialog>
      <TestDriveModal open={openTestDrive} onClose={() => setOpenTestDrive(false)} car={car} />
    </Box>
  );
}

export default SliderBlock;
