import './App.css';
import { useState } from 'react';
import CarSelect from './components/CarSelect';
import CitySelect from './components/CitySelect';
import DealerList from './components/DealerList';
import { cars, dealers, cities } from './data/mockData';
import DateField from './components/DateField';
import ContactFields from './components/ContactFields';
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
import CustomStepper from './components/CustomStepper';

export default function App() {
  const steps = ['Вибір авто', 'Ввід даних', 'Відправка заявки'];
  const [step, setStep] = useState(0);

  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [consent, setConsent] = useState(false);
  const [dealerEditMode, setDealerEditMode] = useState(true);
  const cityError = submitAttempted && !selectedCity;
  const dealerError = submitAttempted && !selectedDealer;
  const consentError = submitAttempted && !consent;
  const handleSelectDealer = (dealer) => {
    setSelectedDealer(dealer);
    setDealerEditMode(false);
  };

  const handleCarSelect = (car) => {
    setSelectedCar(car);
    setStep(1);
  };

  const handleBackToCars = () => {
    setSelectedCar(null);
    setSelectedCity(null);
    setSelectedDealer(null);
    setDealerEditMode(true);
    setStep(0);
  };

  const filteredDealers = dealers.filter((dealer) => {
    const matchCity = !selectedCity || selectedCity === 'ALL' || dealer.city === selectedCity;
    const matchCar = selectedCar && dealer.cars.includes(selectedCar.id);

    return matchCity && matchCar;
  });
  const phoneRegex = /^\d{9}$/;
  const handleSubmit = async () => {
    setSubmitAttempted(true);

    const isValid =
      name.trim() && phoneRegex.test(phone) && selectedCity && selectedCity !== '' && selectedDealer && consent;

    if (!isValid) return;

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

  return (
    <div>
      <CustomStepper step={step} steps={steps} />
      {/* STEP 0 - CAR SELECT */}
      {step === 0 && <CarSelect cars={cars} onSelect={handleCarSelect} />}

      {/* STEP 1 - FULL FORM */}
      {step === 1 && (
        <>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <Typography style={{ color: '#000', fontSize: '44px', fontWeight: '700' }} variant="h5">
              {selectedCar?.name}
            </Typography>
            <img
              src={selectedCar?.bigImage}
              alt={selectedCar?.name}
              style={{
                objectFit: 'contain',
                marginBottom: 10,
                maxWidth: '100%',
              }}
            />
          </div>
          <button
            onClick={handleBackToCars}
            style={{
              display: 'block',
              width: '260px',
              lineHeight: '50px',
              height: '50px',
              background: '#002c5f',
              color: '#fff',
              margin: '10px auto 50px',
              padding: '0 10px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 500,
            }}
          >
            Обрати інший автомобіль
          </button>

          {/* ===================== */}
          {/* CONTACTS SECTION */}
          {/* ===================== */}

          <Typography variant="h6" style={{ marginTop: 20, color: '#000', fontSize: '18px', textAlign: 'left' }}>
            Введіть, будь ласка, контактні дані:
          </Typography>

          <Grid container spacing={2} style={{ marginTop: 30 }}>
            <ContactFields
              name={name}
              setName={setName}
              phone={phone}
              setPhone={setPhone}
              submitAttempted={submitAttempted}
            />
          </Grid>

          {/* ===================== */}
          {/* CITY + DEALER */}
          {/* ===================== */}
          <Grid size={12} container spacing={2} style={{ marginTop: 60, alignItems: 'flex-start' }}>
            {/* CITY */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                style={{ marginBottom: 6, fontWeight: 500, textAlign: 'left', fontSize: '16px', color: '#000' }}
              >
                Місто: <span style={{ color: '#00aad2' }}>*</span>
              </Typography>

              <CitySelect
                value={selectedCity}
                onChange={setSelectedCity}
                cities={cities}
                submitAttempted={submitAttempted}
              />
            </Grid>

            {/* DEALER */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                style={{ marginBottom: 6, fontWeight: 500, textAlign: 'left', fontSize: '16px', color: '#000' }}
              >
                Дилер: <span style={{ color: '#00aad2' }}>*</span>
              </Typography>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
                {/* INPUT (readonly) */}
                <TextField
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 0,
                      '& fieldset': {
                        borderColor: dealerError ? 'red' : undefined,
                      },
                    },
                  }}
                  fullWidth
                  value={selectedDealer ? selectedDealer.name : ''}
                  placeholder="Оберіть дилера"
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />

                {/* BUTTON */}
                <button
                  type="button"
                  onClick={() => {
                    setDealerEditMode(true);
                    setSelectedCity(null);
                    setSelectedDealer(null);
                  }}
                  style={{
                    fontSize: '16px',
                    color: '#00aad2',
                    border: 'none',
                    borderBottom: '1px dashed #00aad2',
                    position: 'absolute',
                    right: '10px',
                    background: 'none',
                    cursor: 'pointer',
                    padding: '0',
                  }}
                >
                  Змінити
                </button>
              </div>
              {dealerError && (
                <Typography
                  style={{ color: 'red', fontSize: 14, marginTop: 5, textAlign: 'left', paddingLeft: '10px' }}
                >
                  Оберіть дилера
                </Typography>
              )}
            </Grid>
          </Grid>
          {dealerEditMode && selectedCity && (
            <>
              {filteredDealers.length === 0 ? (
                <Typography color="error" style={{ marginTop: 40 }}>
                  На жаль, у вибраному місці автомобіля для тест-драйву немає
                </Typography>
              ) : (
                <DealerList dealers={filteredDealers} onSelect={handleSelectDealer} />
              )}
            </>
          )}

          {/* ===================== */}
          {/* DATE + TIME */}
          {/* ===================== */}

          <Typography
            variant="h6"
            style={{ marginTop: 20, color: '#000', fontSize: '18px', textAlign: 'left', marginBottom: 30 }}
          >
            Оберіть, будь-ласка, зручний для Вас час:
          </Typography>

          <Grid container spacing={2} style={{ marginTop: 10 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                style={{ marginBottom: 6, fontWeight: 500, textAlign: 'left', fontSize: '16px', color: '#000' }}
              >
                Дата тест-драйву:
              </Typography>

              <DateField value={date} onChange={setDate} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                style={{ marginBottom: 6, fontWeight: 500, textAlign: 'left', fontSize: '16px', color: '#000' }}
              >
                Час:
              </Typography>
              <TextField
                select
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                  },
                }}
                fullWidth
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                {[' За домовленістю', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00'].map(
                  (t) => (
                    <MenuItem key={t} value={t}>
                      {t}
                    </MenuItem>
                  ),
                )}
              </TextField>
            </Grid>
          </Grid>

          {/* ===================== */}
          {/* CONSENT */}
          {/* ===================== */}
          <p style={{ color: '#00aad2', textAlign: 'left', marginTop: 20, marginBottom: 20 }}>* Обов'язкове поле</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  disableRipple
                  icon={
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        border: '1px solid #e4dcd3',
                        background: '#fff',
                        display: 'block',
                        borderRadius: 0,
                      }}
                    />
                  }
                  checkedIcon={
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        background: '#002c5f',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 0,
                        border: '1px solid #e4dcd3',
                      }}
                    >
                      <img
                        src="https://hyundai.com.ua/sites/all/themes/responsive/images/Vector22.png"
                        alt="check"
                        style={{
                          width: 13,
                          height: 9,
                          display: 'block',
                        }}
                      />
                    </span>
                  }
                />
              }
            />
            <Typography style={{ fontWeight: 400, textAlign: 'left', fontSize: '18px', color: '#74716c' }}>
              Я даю згоду на передачу та обробку моїх персональних даних. <span style={{ color: '#00aad2' }}>*</span>
            </Typography>
            {consentError && (
              <Typography style={{ color: 'red', fontSize: '14px', marginLeft: 14 }}>Потрібно надати згоду</Typography>
            )}
          </div>
          {/* ===================== */}
          {/* SUBMIT */}
          {/* ===================== */}

          <Button
            style={{
              display: 'block',
              width: '260px',
              lineHeight: '50px',
              height: '50px',
              background: '#002c5f',
              color: '#fff',
              margin: '50px auto 60px',
              padding: '0 10px',
              cursor: 'pointer',
              fontSize: '16px',
              borderRadius: 0,
              textTransform: 'none',
              fontWeight: '400',
            }}
            onClick={handleSubmit}
          >
            Відправити
          </Button>
        </>
      )}

      {/* STEP 2 - SUCCESS */}
      {step === 2 && (
        <div style={{ textAlign: 'center', marginTop: 100 }}>
          <h2 style={{ color: '#000', marginTop: 50, marginBottom: 50, fontSize: '44px' }}>Дякуємо! </h2>
          <p style={{ color: '#000', marginTop: 50, marginBottom: 20, fontSize: '24px' }}>Ваша заявка надіслана.</p>
          <p style={{ color: '#000', fontSize: '24px' }}>Найближчим часом наш дилер зв’яжеться з Вами.</p>
          <p style={{ color: '#000', marginTop: 50, marginBottom: 50, fontSize: '44px' }}>
            <b>{selectedCar?.name}</b>
          </p>
          <img
            src={selectedCar?.bigImage}
            alt={selectedCar?.name}
            style={{
              objectFit: 'contain',
              marginBottom: 10,
              maxWidth: '100%',
            }}
          />
        </div>
      )}
    </div>
  );
}
