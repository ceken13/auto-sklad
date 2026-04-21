import './App.css';
import { useState } from 'react';

import CarSelect from './components/CarSelect';
import CitySelect from './components/CitySelect';
import DealerList from './components/DealerList';

import { cars, dealers, cities } from './data/mockData';

import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Grid,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

export default function App() {
  const [step, setStep] = useState(0);

  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedCity, setSelectedCity] = useState('Будь-яке');
  const [selectedDealer, setSelectedDealer] = useState(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [consent, setConsent] = useState(false);

  const steps = ['Вибір авто', 'Форма', 'Успіх'];

  const handleCarSelect = (car) => {
    setSelectedCar(car);
    setStep(1);
  };

  const handleBackToCars = () => {
    setSelectedCar(null);
    setStep(0);
  };

  const filteredDealers = dealers.filter((dealer) => {
    const matchCity = selectedCity === 'Будь-яке' || dealer.city === selectedCity;

    const matchCar = selectedCar && dealer.cars.includes(selectedCar.id);

    return matchCity && matchCar;
  });

  const handleSubmit = async () => {
    const payload = {
      car: selectedCar,
      dealer: selectedDealer,
      city: selectedCity,
      name,
      phone,
      date,
      time,
    };

    console.log('CRM payload:', payload);

    await new Promise((res) => setTimeout(res, 1000));

    setStep(2);
  };

  const isFormValid = name && phone && selectedDealer && date && time && consent;

  return (
    <div style={{ padding: 40 }}>
      {/* STEP INDICATOR */}
      <Stepper activeStep={step} style={{ marginBottom: 40 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* STEP 0 - CAR SELECT */}
      {step === 0 && <CarSelect cars={cars} onSelect={handleCarSelect} />}

      {/* STEP 1 - FULL FORM */}
      {step === 1 && (
        <>
          <Typography variant="h5" gutterBottom>
            {selectedCar?.name}
          </Typography>

          <Button variant="outlined" onClick={handleBackToCars} style={{ marginBottom: 20 }}>
            Обрати інший автомобіль
          </Button>

          {/* ===================== */}
          {/* CONTACTS SECTION */}
          {/* ===================== */}

          <Typography variant="h6" style={{ marginTop: 20 }}>
            Введіть, будь ласка, контактні дані:
          </Typography>

          <Grid container spacing={2} style={{ marginTop: 10 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Ваше ім’я *"
                placeholder="Введіть ім’я"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Номер телефона *"
                placeholder="+38 (___) ___-__-__"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
          </Grid>

          {/* ===================== */}
          {/* CITY + DEALER */}
          {/* ===================== */}

          <Typography variant="h6" style={{ marginTop: 30 }}>
            Оберіть, будь-ласка, найближчого дилера:
          </Typography>

          <div style={{ marginTop: 10 }}>
            <CitySelect value={selectedCity} onChange={setSelectedCity} cities={cities} />

            {selectedCity === '' && <Typography color="error">Поле "Місто" є обов’язковим.</Typography>}
          </div>

          {filteredDealers.length === 0 ? (
            <Typography color="error" style={{ marginTop: 10 }}>
              На жаль, у вибраному місті немає доступного авто для тест-драйву
            </Typography>
          ) : (
            <DealerList dealers={filteredDealers} onSelect={setSelectedDealer} />
          )}

          {selectedDealer && (
            <Typography style={{ marginTop: 10 }}>
              Дилер: <b>{selectedDealer.name}</b>
            </Typography>
          )}

          {/* ===================== */}
          {/* DATE + TIME */}
          {/* ===================== */}

          <Typography variant="h6" style={{ marginTop: 30 }}>
            Оберіть, будь-ласка, зручний для Вас час:
          </Typography>

          <Grid container spacing={2} style={{ marginTop: 10 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="date"
                label="Дата тест-драйву"
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField select fullWidth label="Час" value={time} onChange={(e) => setTime(e.target.value)}>
                {['10:00', '12:00', '14:00', '16:00'].map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {/* ===================== */}
          {/* CONSENT */}
          {/* ===================== */}

          <FormControlLabel
            style={{ marginTop: 20 }}
            control={<Checkbox checked={consent} onChange={(e) => setConsent(e.target.checked)} />}
            label="Я даю згоду на передачу та обробку моїх персональних даних."
          />

          {/* ===================== */}
          {/* SUBMIT */}
          {/* ===================== */}

          <Button variant="contained" style={{ marginTop: 20 }} disabled={!isFormValid} onClick={handleSubmit}>
            Відправити заявку
          </Button>
        </>
      )}

      {/* STEP 2 - SUCCESS */}
      {step === 2 && (
        <div style={{ textAlign: 'center', marginTop: 100 }}>
          <h2>Дякуємо! </h2>

          <p>
            Ви замовили тест-драйв <b>{selectedCar?.name}</b>
          </p>

          <p>З вами зв’яжеться наш менеджер найближчим часом</p>
        </div>
      )}
    </div>
  );
}
