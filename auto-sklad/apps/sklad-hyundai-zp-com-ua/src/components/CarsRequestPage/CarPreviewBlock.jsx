import { theme } from '../../theme.ts';
import { getStyles } from './styles';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export function CarPreviewBlock({ car, onSubmit, setCaptchaValue, isCaptchaValid }) {
  const styles = getStyles(theme);

  return (
    <Box>
      <Box sx={styles.previewBlockWrap}>
        {/* Статус */}
        {car?.availablCar && (
          <Typography color="green" sx={{ fontSize: '20px', fontFamily: 'HyundaiSansHeadLight, sans-serif' }}>
            В наявності
          </Typography>
        )}

        <Box component="img" src={car?.imgCar} sx={{ maxWidth: '100%' }} />
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
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ mb: 1, flex: 1, fontSize: '18px' }}>Регулярна ціна:</Typography>
            <Typography
              sx={{
                mb: 1,
                flex: 1,
                fontSize: '18px',
                fontWeight: '900',
                fontFamily: 'HyundaiSansHeadRegular, sans-serif',
              }}
            >
              {car?.regularPrice} грн
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
