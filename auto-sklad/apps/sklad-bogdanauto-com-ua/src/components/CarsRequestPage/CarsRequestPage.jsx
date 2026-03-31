import { theme } from '../../theme.ts';
import { getStyles } from './styles';
import Typography from '@mui/material/Typography';
import { Layout } from '../Layout/Layout';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { carsMock } from '../SortingCarBlock/carsMock';
import { CarPreviewBlock } from './CarPreviewBlock';
import { CarForm } from './CarForm';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export function CarsRequestPage({ id }) {
  const styles = getStyles(theme);
  const schema = yup
    .object({
      firstName: yup
        .string()
        .required("Ім'я обов'язкове")
        .matches(/^[А-Яа-яA-Za-zІіЇїЄє'-]+$/, 'Тільки літери'),

      middleName: yup
        .string()
        .nullable()
        .matches(/^[А-Яа-яA-Za-zІіЇїЄє'-]*$/, 'Тільки літери'),

      lastName: yup
        .string()
        .required('Прізвище обовʼязкове')
        .matches(/^[А-Яа-яA-Za-zІіЇїЄє'-]+$/, 'Тільки літери'),

      email: yup.string().required('Email обовʼязковий').email('Невірний email'),

      phone: yup
        .string()
        .required('Телефон обовʼязковий')
        .matches(/^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Формат: +38 (067) 123-45-67'),

      isIndividual: yup.boolean(),
      isCompany: yup.boolean(),

      comment: yup.string(),

      contactMethod: yup.string().required(),
    })
    .test('person-type', 'Оберіть тип особи', function (data) {
      if (!data.isIndividual && !data.isCompany) {
        return this.createError({ path: 'personType' });
      }
      return true;
    });

  const car = carsMock.find((item) => item?.id === Number(id));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phone: '',
      isIndividual: false,
      isCompany: false,
      comment: '',
      contactMethod: '',
    },
  });

  const onSubmit = (data) => {
    console.log('Дані форми:', data);
    alert('Форма відправлена!');
  };

  return (
    <Layout>
      <Typography variant="h1">ОНЛАЙН СКЛАД</Typography>
      <Typography variant="h4" sx={styles.formTitle}>
        ЗАПИТ НА АВТОМОБІЛЬ
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={styles.flexWrap}>
          <Box sx={{ flex: 2 }}>
            <CarForm control={control} errors={errors} />
          </Box>

          <Box sx={{ flex: 1 }}>
            <CarPreviewBlock car={car} onSubmit={handleSubmit(onSubmit)} />
          </Box>
        </Box>
      </form>
    </Layout>
  );
}

export default CarsRequestPage;
