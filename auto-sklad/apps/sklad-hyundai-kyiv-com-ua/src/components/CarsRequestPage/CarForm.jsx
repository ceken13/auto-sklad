import React, { useState } from 'react';
import { theme } from '../../theme.ts';
import { getStyles } from './styles';
import { Box, TextField, Typography, Checkbox, FormControlLabel, Radio, RadioGroup, FormControl } from '@mui/material';
import { Controller } from 'react-hook-form';

export function CarForm({ control, errors }) {
  const styles = getStyles(theme);
  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 12);

    const match = digits.match(/^38(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);

    if (!match) return value;

    return `+38 (${match[1] || ''}) ${match[2] || ''}${match[3] ? '-' + match[3] : ''}${
      match[4] ? '-' + match[4] : ''
    }`;
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h6" sx={{ m: '0px 0 40px' }}>
        Заповніть, будь ласка, форму для зворотнього зв’язку:
      </Typography>
      {/* Ім’я / По батькові / Прізвище */}
      <Box sx={styles.rowStyle}>
        <Box sx={styles.fieldWrapperStyle}>
          <Typography mb={1}>Введіть ім'я:</Typography>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: "Ім'я обов'язкове" }}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Іван"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                fullWidth
              />
            )}
          />
        </Box>

        <Box sx={styles.fieldWrapperStyle}>
          <Typography mb={1}>Введіть По батькові:</Typography>
          <Controller
            name="middleName"
            control={control}
            render={({ field }) => <TextField {...field} placeholder="Володимирович" fullWidth />}
          />
        </Box>

        <Box sx={styles.fieldWrapperStyle}>
          <Typography mb={1}>Введіть прізвище:</Typography>
          <Controller
            name="lastName"
            control={control}
            rules={{ required: "Прізвище обов'язкове" }}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Михайленко"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                fullWidth
              />
            )}
          />
        </Box>
      </Box>

      {/* Email / Phone */}
      <Box sx={styles.rowStyle}>
        <Box sx={styles.fieldWrapperStyle}>
          <Typography mb={1}>Введіть ваш e-mail:</Typography>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email обовʼязковий',
              pattern: { value: /^\S+@\S+$/i, message: 'Невірний email' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="example@example.com"
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
              />
            )}
          />
        </Box>

        <Box sx={styles.fieldWrapperStyle}>
          <Typography mb={1}>Введіть ваш телефон:</Typography>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                value={field.value || ''}
                onChange={(e) => field.onChange(formatPhone(e.target.value))}
                placeholder="+38 (0"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                fullWidth
              />
            )}
          />
        </Box>
      </Box>

      {/* Чекбокси */}
      <Box sx={{ mb: 3 }}>
        <Typography mb={1}>Тип особи:</Typography>
        <Box>
          <Controller
            name="customerType"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field} sx={{ flexDirection: 'row', gap: 3 }}>
                <FormControlLabel value="individual" control={<Radio />} label="Фізична особа" />

                <FormControlLabel value="legal" control={<Radio />} label="Юридична особа" />
              </RadioGroup>
            )}
          />

          {errors.customerType && (
            <Typography color="error" fontSize={14}>
              {errors.customerType.message}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Коментар */}
      <Box mb={3}>
        <Typography mb={1}>Ваш коментар:</Typography>
        <Controller
          name="comment"
          control={control}
          render={({ field }) => (
            <TextField {...field} multiline rows={4} placeholder="Напишіть, будь ласка, свої коментарі" fullWidth />
          )}
        />
      </Box>

      {/* Радіо */}
      <FormControl>
        <Typography mb={1}>Метод комунікації:</Typography>
        <Controller
          name="contactMethod"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel value="viber" control={<Radio />} label="Viber" />
              <FormControlLabel value="whatsapp" control={<Radio />} label="WhatsApp" />
              <FormControlLabel value="sms" control={<Radio />} label="SMS" />
              <FormControlLabel value="telegram" control={<Radio />} label="Telegram" />
            </RadioGroup>
          )}
        />
        {errors.contactMethod && (
          <Typography color="error" fontSize={14}>
            {errors.contactMethod.message}
          </Typography>
        )}
      </FormControl>
    </Box>
  );
}

export default CarForm;
