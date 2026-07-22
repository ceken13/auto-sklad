import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IMaskInput } from 'react-imask';
import * as yup from 'yup';
import { useEffect } from 'react';
import { ORGANIZATION_MAP } from '../../utils/organizationsCity';

const schema = yup.object({
  model: yup.string().required(),
  dealerName: yup.string().required('Оберіть дилерський центр'),
  preferredDate: yup.string().required('Оберіть дату'),
  fullName: yup
    .string()
    .required("ПІБ обов'язковий")
    .matches(/^[А-Яа-яA-Za-zІіЇїЄє'`\-\s]+$/, 'Некоректне ПІБ'),
  phone: yup
    .string()
    .required("Телефон обов'язковий")
    .matches(/^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Формат: +38 (067) 123-45-67'),
});

export default function TestDriveForm({ car, onSubmit }) {
  const organizations = Object.values(ORGANIZATION_MAP);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      model: car?.model || '',
      dealerName: car?.dealerName || '',
      preferredDate: '',
      fullName: '',
      phone: '',
    },
  });

  useEffect(() => {
    reset({
      model: car?.model || '',
      dealerName: car?.dealerName || '',
      preferredDate: '',
      fullName: '',
      phone: '',
    });
  }, [car, reset]);

  const submit = async (data) => {
    try {
      await onSubmit?.({
        ...data,
        vinCode: car?.vinCode,
        carBrand: car?.carBrand,
        model: car?.model,
      });

      reset({
        model: car?.model || '',
        dealerName: car?.dealerName || '',
        preferredDate: '',
        fullName: '',
        phone: '',
      });
    } catch (error) {
      console.error(error);
      alert('Помилка відправки заявки');
    }
  };
  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Box display="flex" flexDirection="column" gap={1} mt={1} mb={1}>
        <Typography>Модель:</Typography>
        <Controller
          name="model"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        />

        <Typography mt={1}>Оберіть дилерський центр:</Typography>
        <Controller
          name="dealerName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              placeholder="Оберіть дилерський центр"
              fullWidth
              error={!!errors.dealerName}
              helperText={errors.dealerName?.message}
            >
              {organizations.map((org) => (
                <MenuItem key={org.dealerName} value={org.dealerName}>
                  {org.dealerCity}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Typography mt={1}>Оберіть бажану дату тест-драйву*:</Typography>

        <Controller
          name="preferredDate"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="date"
              fullWidth
              inputProps={{
                min: today,
              }}
              error={!!errors.preferredDate}
              helperText={errors.preferredDate?.message}
            />
          )}
        />
        <Typography mt={1}>ПІБ*:</Typography>

        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Введіть ваше ім'я"
              fullWidth
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              onChange={(e) => {
                const value = e.target.value;

                // тільки літери, пробіл, дефіс, апостроф
                const filteredValue = value.replace(/[^А-Яа-яA-Za-zІіЇїЄє'`\-\s]/g, '');

                field.onChange(filteredValue);
              }}
            />
          )}
        />
        <Typography mt={1}>Телефон*:</Typography>

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="+38 (000) 000-00-00"
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone?.message}
              InputProps={{
                inputComponent: IMaskInput,
                inputProps: {
                  mask: '+{38} (000) 000-00-00',
                },
              }}
            />
          )}
        />

        <Typography fontSize={14}>*Надсилаючи заявку ви даєте згоду на обробку ваших персональних даних</Typography>

        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 1,
            backgroundColor: '#0f6b5c',
            textTransform: 'none',
            py: 1.5,
            '&:hover': {
              backgroundColor: '#0d5a4d',
            },
            margin: '20px auto 0',
          }}
        >
          Надіслати
        </Button>
      </Box>
    </form>
  );
}
