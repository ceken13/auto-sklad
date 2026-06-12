import { theme } from '../../theme.ts';
import { getStyles } from './styles';
import Typography from '@mui/material/Typography';
import { Layout } from '../Layout/Layout';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { CarPreviewBlock } from './CarPreviewBlock';
import { CarForm } from './CarForm';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SuccessModal } from '../SuccessModal/SuccessModal';
import ReCAPTCHA from 'react-google-recaptcha';

import { useParams } from 'react-router-dom';
import { useCar } from '../../hooks/useCar';

import { Loader } from '../ui/Loader';
import { CarRequestSkeleton } from '../ui/CarRequestSkeleton';
import { sendCarRequest } from '../../api/request.api';

export function CarsRequestPage() {
  const styles = getStyles(theme);
  const [captchaValue, setCaptchaValue] = useState(null);
  const isCaptchaValid = !!captchaValue;
  const schema = yup.object({
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

    customerType: yup.string().required('Оберіть тип особи'),

    comment: yup.string(),

    contactMethod: yup.string().required('Оберіть метод комунікації'),
  });

  const {
    control,
    handleSubmit,
    reset,
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
      customerType: '',
      comment: '',
      contactMethod: '',
    },
  });

  const [modalOpen, setModalOpen] = useState(false);

  const onSubmit = async (data) => {
    if (!captchaValue) {
      alert('Підтвердіть капчу');
      return;
    }

    try {
      await sendCarRequest({
        firstName: data.firstName,
        middleName: data.middleName || '',
        lastName: data.lastName,

        email: data.email,
        phone: data.phone,

        comment: data.comment || '',

        communicationMethod: data.contactMethod || '',

        customerType: data.customerType,

        vinCode: car?.vinCode,
        dealerName: car?.dealerName,

        carBrand: car?.carBrand,
        model: car?.model,
      });

      setModalOpen(true);
      reset();
      setCaptchaValue(null);
    } catch (error) {
      console.error(error);
      alert('Помилка відправки заявки');
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const { id } = useParams();
  const { car, loading } = useCar(id);

  if (loading || !car) {
    return (
      <Layout>
        <CarRequestSkeleton />
      </Layout>
    );
  }

  return (
    <Layout>
      <Typography variant="h1">Онлайн склад Богдан-Авто Запоріжжя</Typography>
      <Typography variant="h4" sx={styles.formTitle}>
        ЗАПИТ НА АВТОМОБІЛЬ
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={styles.flexWrap}>
          <Box sx={{ flex: 2 }}>
            <CarForm control={control} errors={errors} />
          </Box>

          <Box sx={{ flex: 1 }}>
            <CarPreviewBlock
              car={car}
              onSubmit={handleSubmit(onSubmit)}
              setCaptchaValue={setCaptchaValue}
              isCaptchaValid={isCaptchaValid}
            />
          </Box>
        </Box>
      </form>
      <SuccessModal open={modalOpen} onClose={handleCloseModal} />
    </Layout>
  );
}

export default CarsRequestPage;
