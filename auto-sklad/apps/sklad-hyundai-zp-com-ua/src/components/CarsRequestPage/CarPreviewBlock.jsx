import { theme } from '../../theme.ts';
import { getStyles } from './styles';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { getMediaUrl } from '../../utils/uploadImage';

export function CarPreviewBlock({ car, onSubmit, setCaptchaValue, isCaptchaValid }) {
  const styles = getStyles(theme);

  return (
    <Box>
      <Box sx={styles.previewBlockWrap}>
        {/* Статус */}
        {car?.availableCar && (
          <Typography color="green" sx={{ fontSize: '20px', fontFamily: 'HyundaiSansHeadLight, sans-serif' }}>
            В наявності
          </Typography>
        )}

        <Box
          component="img"
          src={getMediaUrl(car?.imgCar) || '/images/car-placeholder.jpg'}
          onError={(e) => {
            e.currentTarget.src = '/images/car-placeholder.jpg';
          }}
          sx={{ maxWidth: '100%' }}
        />

        <Box>
          <Box sx={{ display: 'flex' }}>
            <Typography
              sx={{
                mb: 1,
                flex: 1,
                fontSize: '20px',
                fontWeight: '600',
                fontFamily: 'HyundaiSansHeadRegular, sans-serif',
              }}
            >
              {car?.carBrand} {car?.model} {car?.trimLevel}
            </Typography>
          </Box>
          {car?.specialPrice && (
            <Box sx={{ display: 'flex', color: 'red', fontWeight: '600' }}>
              <Typography sx={{ mb: 1, flex: 1, fontSize: '18px' }}>Акційна ціна:</Typography>
              <Typography
                sx={{
                  mb: 1,
                  flex: 1,
                  fontFamily: 'HyundaiSansHeadRegular, sans-serif',
                  fontSize: '18px',
                  fontWeight: '900',
                }}
              >
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
                fontFamily: 'HyundaiSansHeadRegular, sans-serif',
                textDecoration: car?.specialPrice ? 'line-through' : 'none',
              }}
            >
              {car?.regularPrice?.toLocaleString('uk-UA')} грн
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* Кнопка */}
      {/* YOUR_SITE_KEY 6LfAQrosAAAAAH6ZKByBRXXM4kyJj3P7IkiQ0FSS*/}
      {/* YOUR_SIcret_KEY 6LfAQrosAAAAAJJHq_-BxPmioDLbusTQJYtCAC5X*/}
      <ReCAPTCHA sitekey="6LfAQrosAAAAAH6ZKByBRXXM4kyJj3P7IkiQ0FSS" onChange={(value) => setCaptchaValue(value)} />
      <Button
        type="submit"
        fullWidth
        disabled={!isCaptchaValid}
        sx={{
          backgroundColor: '#002C5E',
          color: '#fff',
          padding: '12px',
          borderRadius: '0px',
          textTransform: 'none',
          width: '100%',
          fontFamily: 'HyundaiSansHeadLight, sans-serif',
          '&.Mui-disabled': {
            color: '#9bb3c9',
            opacity: 1,
          },
        }}
      >
        Додати в кошик
      </Button>
    </Box>
  );
}

export default CarPreviewBlock;
