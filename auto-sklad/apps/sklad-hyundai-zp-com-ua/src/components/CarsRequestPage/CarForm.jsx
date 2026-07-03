import React, { useState } from 'react';
import { theme } from '../../theme.ts';
import { getStyles } from './styles';
import { Box, TextField, Typography, Checkbox, FormControlLabel, Radio, RadioGroup, FormControl } from '@mui/material';
import { Controller } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

export function CarForm({ control, errors }) {
  const styles = getStyles(theme);
  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '').replace(/^38/, '').slice(0, 10);

    const part1 = digits.slice(0, 3);
    const part2 = digits.slice(3, 6);
    const part3 = digits.slice(6, 8);
    const part4 = digits.slice(8, 10);

    let result = '+38 (';

    if (part1) result += part1;
    if (digits.length >= 3) result += ') ';
    if (part2) result += part2;
    if (part3) result += '-' + part3;
    if (part4) result += '-' + part4;

    return result;
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h6" sx={{ m: '0px 0 40px' }}>
        Заповніть, будь ласка, форму для зворотнього зв’язку:
      </Typography>
      {/* Ім’я / По батькові / Прізвище */}
      <Box sx={styles.rowStyle}>
        <Box sx={styles.fieldWrapperStyle}>
          <Typography mb={1}>Введіть ім'я*:</Typography>
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
          <Typography mb={1}>Введіть прізвище*:</Typography>
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
          <Typography mb={1}>Введіть ваш e-mail*:</Typography>
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
          <Typography mb={1}>Введіть ваш телефон*:</Typography>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                value={field.value || ''}
                onChange={field.onChange}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                placeholder="+38 (000) 000-00-00"
                InputProps={{
                  inputComponent: IMaskInput,
                  inputProps: {
                    mask: '+{38} (000) 000-00-00',
                  },
                }}
              />
            )}
          />
        </Box>
      </Box>

      {/* Чекбокси */}
      <Box sx={{ mb: 3 }}>
        <Typography mb={1}>Тип особи*:</Typography>
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
        <Typography mb={1}>Метод комунікації*:</Typography>
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
