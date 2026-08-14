import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Layout } from '../Layout/Layout';
import { Typography, Box } from '@mui/material';

import { TradeInStepVehicle } from './TradeInStepVehicle';
import { TradeInStepContact } from './TradeInStepContact';

import { SuccessModal } from '../SuccessModal/SuccessModal';

import { TradeInDesiredCarCard } from './TradeInDesiredCarCard';
import { useCar } from '../../hooks/useCar';
import { Loader } from '../ui/Loader';
import { sendTradeInRequest } from '../../api/tradeIn.api';

export function TradeInForm({ id }) {
  const { car, loading } = useCar(id);

  const [step, setStep] = useState(1);
  const [successOpen, setSuccessOpen] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      autoRiaEnabled: false,
      autoRiaUrl: '',

      brand: '',
      model: '',
      year: '',
      mileage: '',
      vin: '',
      plateNumber: '',

      transmission: '',
      engine: '',
      bodyType: '',

      condition: '',
      conditionComment: '',

      photos: [],

      loan: '',

      desiredCar: '',
      dealer: '',
      firstName: '',
      middleName: '',
      lastName: '',

      email: '',
      phone: '',
      contactMethod: '',
      contactTime: '',
      agreement: false,
    },
  });
  useEffect(() => {
    if (car) {
      setValue(
        'desiredCar',
        `${car.carBrand} ${car.model}. Комплектація: ${car.trimLevel || '—'}, Двигун: ${car.engine || '—'}`,
      );
    }
  }, [car, setValue]);
  if (id && (loading || !car)) {
    return <Loader />;
  }
  const onSubmit = (data) => {
    console.log(data);
  };
  const handleFinalSubmit = handleSubmit(async (data) => {
    const payload = {
      contact: {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        contactMethod: data.contactMethod,
        contactTime: data.contactTime,
      },

      currentCar: {
        autoRiaEnabled: data.autoRiaEnabled,
        autoRiaUrl: data.autoRiaUrl,

        brand: data.brand,
        model: data.model,
        year: data.year ? String(data.year) : null,
        mileage: data.mileage ? String(data.mileage) : null,

        vin: data.vin,
        plateNumber: data.plateNumber,

        transmission: data.transmission,
        engine: data.engine,
        bodyType: data.bodyType,

        condition: data.condition,
        conditionComment: data.conditionComment,

        loan: data.loan,

        photos: data.photos,
      },
      dealer: data.dealer || null,

      desiredCar: {
        vinCode: car?.vinCode || null,
        carBrand: car?.carBrand || null,
        model: car?.model || null,
        dealerCity: car?.dealerCity || null,
        comment: data.desiredCar || null,
      },
    };

    console.log('TRADE IN PAYLOAD', payload);

    await sendTradeInRequest(payload);

    setSuccessOpen(true);
  });

  return (
    <Layout>
      <Typography variant="h1" sx={{ mt: 10 }}>
        ОЦІНКА АВТО ЗА TRADE IN
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: 'flex',
            gap: 5,
            mt: 5,
            alignItems: 'flex-start',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
          }}
        >
          <Box flex={2}>
            {step === 1 && (
              <TradeInStepVehicle
                control={control}
                errors={errors}
                watch={watch}
                setValue={setValue}
                trigger={trigger}
                nextStep={() => setStep(2)}
                car={car}
              />
            )}
            {step === 2 && (
              <TradeInStepContact
                control={control}
                errors={errors}
                prevStep={() => setStep(1)}
                handleFinalSubmit={handleFinalSubmit}
              />
            )}
          </Box>

          <Box flex={1}>{car && <TradeInDesiredCarCard car={car} />}</Box>
        </Box>
      </form>
      <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
    </Layout>
  );
}

export default TradeInForm;
