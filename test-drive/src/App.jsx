import './App.css';
import { useState } from 'react';
import CarSelect from './components/CarSelect';
import CitySelect from './components/CitySelect';
import DealerList from './components/DealerList';
import { cars } from './data/mockData';
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
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useEffect } from 'react';
//тут норм
export default function App() {
  const [cities, setCities] = useState([]);
  const [dealers, setDealers] = useState([]);

  const [citiesLoading, setCitiesLoading] = useState(false);
  const [dealersLoading, setDealersLoading] = useState(false);

  const steps = ['Вибір авто', 'Ввід даних', 'Відправка заявки'];
  const [step, setStep] = useState(0);

  const [selectedCar, setSelectedCar] = useState(null);
  const [city, setSelectedCity] = useState(null);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [consent, setConsent] = useState(false);
  const [dealerEditMode, setDealerEditMode] = useState(true);
  const [showFallbackDealers, setShowFallbackDealers] = useState(false);
  const [fallbackDealers, setFallbackDealers] = useState([]);
  const [fallbackLoading, setFallbackLoading] = useState(false);
  const [dealerChosen, setDealerChosen] = useState(false);
  const [noDealersPopupOpen, setNoDealersPopupOpen] = useState(false);
  const [allPopupShown, setAllPopupShown] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const getAvailableTimeSlots = (selectedDate) => {
    const slots = ['За домовленістю'];

    if (!selectedDate) {
      for (let h = 10; h <= 18; h++) {
        slots.push(`${h}:00-${h + 1}:00`);
      }
      return slots;
    }

    const today = new Date();

    const selected = new Date(selectedDate);

    const isToday =
      selected.getFullYear() === today.getFullYear() &&
      selected.getMonth() === today.getMonth() &&
      selected.getDate() === today.getDate();

    let startHour = 10;

    if (isToday) {
      // якщо вже 13:18 → починаємо з 14
      startHour = Math.max(10, today.getHours() + 1);
    }

    for (let h = startHour; h <= 18; h++) {
      slots.push(`${h}:00-${h + 1}:00`);
    }

    return slots;
  };
  const timeSlots = getAvailableTimeSlots(date);

  const cityError = submitAttempted && !city;
  const dealerError = submitAttempted && !selectedDealer;
  const consentError = submitAttempted && !consent;
  const resetDealerViews = () => {
    setDealers([]);
    setFallbackDealers([]);
    setShowFallbackDealers(false);
  };
  const handleSelectDealer = (dealer) => {
    setSelectedDealer(dealer);
    setDealerEditMode(false);
    setDealerChosen(true);
  };

  const handleCarSelect = async (car) => {
    setSelectedCar(car);
    setSelectedCity(null);
    setSelectedDealer(null);
    setCities([]);
    setDealers([]);

    try {
      const response = await fetch(
        //`https://hyundai.com.ua/api/test-drive/cities?model=${encodeURIComponent(car.apiModel)}&lang=uk`,
        `/api/test-drive/all-cities?lang=uk`,
      );

      const result = await response.json();

      setCities(result.data.cities);

      setStep(1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackToCars = () => {
    setSelectedCar(null);
    setSelectedCity(null);
    setSelectedDealer(null);
    setDealerEditMode(true);
    setCities([]);
    setDealers([]);
    setFallbackDealers([]);
    setNoDealersPopupOpen(false);
    setAllPopupShown(false);

    setShowFallbackDealers(false);
    setDealerChosen(false);
    setStep(0);
  };

  const handleCityChange = async (city) => {
    setSelectedCity(city);
    setSelectedDealer(null);
    setDealerChosen(false);
    setDealersLoading(true);

    resetDealerViews();
    setDealerEditMode(true);

    try {
      let dealersData = [];

      if (city === 'ALL') {
        // отримуємо дилерів з усіх міст
        const requests = cities.map((city) =>
          fetch(
            `/api/test-drive/dealers?model=${encodeURIComponent(
              selectedCar.apiModel,
            )}&city=${encodeURIComponent(city)}&lang=uk`,
          ).then((res) => res.json()),
        );

        const results = await Promise.all(requests);

        dealersData = results.flatMap((result) => result.data?.dealers || []);

        // прибираємо дублікати
        dealersData = dealersData.filter(
          (dealer, index, self) => index === self.findIndex((d) => d.nid === dealer.nid),
        );
      } else {
        const response = await fetch(
          `/api/test-drive/dealers?model=${encodeURIComponent(
            selectedCar.apiModel,
          )}&city=${encodeURIComponent(city)}&lang=uk`,
        );

        const result = await response.json();
        dealersData = result.data.dealers;
      }

      const mappedDealers = dealersData.map((dealer) => ({
        id: dealer.nid,
        name: dealer.title,
        city: dealer.field_dealer_city?.city_name,
        fullAddress: dealer.field_dealer_address?.value ?? '',
        phonesShowroom: Array.isArray(dealer.field_dealer_office_phone)
          ? dealer.field_dealer_office_phone.map((p) => p.value)
          : [],

        phonesService: Array.isArray(dealer.field_dealer_service_phone)
          ? dealer.field_dealer_service_phone.map((p) => p.value)
          : [],
        site: dealer.field_dealer_site?.url ?? '',
        siteLabel: dealer.field_dealer_site?.url?.replace('https://', '')?.replace('http://', '')?.replace(/\/$/, ''),
        mapUrl: `https://www.google.com/maps?q=${encodeURIComponent(dealer.field_dealer_address?.value ?? '')}`,
      }));

      setDealers(mappedDealers);

      if (mappedDealers.length === 0) {
        if (city === 'ALL') {
          setAllPopupShown(true);
          setNoDealersPopupOpen(true);
        } else if (allPopupShown) {
          // попап уже показували після ALL
          await handleLoadAllCityDealers(city);
        } else {
          // якщо користувач одразу вибрав місто
          setNoDealersPopupOpen(true);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDealersLoading(false); // 👈 ДОДАТИ
    }
  };
  const handleLoadAllCityDealers = async (city) => {
    if (!city) return;

    setFallbackLoading(true);

    try {
      const response = await fetch(`/api/test-drive/dealers?city=${encodeURIComponent(city)}&lang=uk`);

      const result = await response.json();

      const dealersData = result.data?.dealers || [];

      const mapped = dealersData.map((dealer) => ({
        id: dealer.nid,
        name: dealer.title,
        city: dealer.field_dealer_city?.city_name,
        fullAddress: dealer.field_dealer_address?.value ?? '',
        phonesShowroom: Array.isArray(dealer.field_dealer_office_phone)
          ? dealer.field_dealer_office_phone.map((p) => p.value)
          : [],
        phonesService: Array.isArray(dealer.field_dealer_service_phone)
          ? dealer.field_dealer_service_phone.map((p) => p.value)
          : [],
        site: dealer.field_dealer_site?.url ?? '',
        siteLabel: dealer.field_dealer_site?.url?.replace('https://', '')?.replace('http://', '')?.replace(/\/$/, ''),
        mapUrl: `https://www.google.com/maps?q=${encodeURIComponent(dealer.field_dealer_address?.value ?? '')}`,
      }));

      setFallbackDealers(mapped);
      setShowFallbackDealers(true);
    } catch (e) {
      console.error(e);
    } finally {
      setFallbackLoading(false);
    }
  };
  const phoneRegex = /^\d{9}$/;
  const handleSubmit = async () => {
    setSubmitAttempted(true);

    const isValid = name.trim() && phoneRegex.test(phone) && city && city !== '' && selectedDealer && consent;

    if (!isValid) return;

    const payload = {
      car: {
        id: selectedCar.id,
        name: selectedCar.name,
        apiModel: selectedCar.apiModel,
      },

      dealer: {
        id: selectedDealer.id,
        name: selectedDealer.name,
        city: selectedDealer.city,
        fullAddress: selectedDealer.fullAddress,
      },

      city: city,
      name,
      phone,
      date,
      time,
    };

    try {
      setSubmitLoading(true);
      const response = await fetch('/api/test-drive/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      console.log('Order result:', result);

      if (result.status === 'success') {
        setStep(2);
      } else {
        alert(result.message || 'Помилка відправки заявки');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Помилка зʼєднання із сервером');
    } finally {
      setSubmitLoading(false);
    }
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
          {/* CITY + DEALER */}
          {/* ===================== */}
          <Grid size={12} container spacing={2} style={{ marginTop: 60, alignItems: 'flex-start' }}>
            {/* CITY */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                style={{
                  marginBottom: 6,
                  fontWeight: 500,
                  textAlign: 'left',
                  fontSize: '16px',
                  color: '#000',
                  fontFamily: 'HyundaiSansHeadMedium',
                }}
              >
                Місто: <span style={{ color: '#00aad2' }}>*</span>
              </Typography>

              <CitySelect value={city} onChange={handleCityChange} cities={cities} submitAttempted={submitAttempted} />
            </Grid>

            {/* DEALER */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                style={{
                  marginBottom: 6,
                  fontWeight: 500,
                  textAlign: 'left',
                  fontSize: '16px',
                  color: '#000',
                  fontFamily: 'HyundaiSansHeadMedium',
                }}
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

                    setSelectedDealer(null);
                    setDealerChosen(false);
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

          {!dealerChosen && (dealers.length > 0 || showFallbackDealers) && (
            <DealerList dealers={showFallbackDealers ? fallbackDealers : dealers} onSelect={handleSelectDealer} />
          )}
          <Dialog open={noDealersPopupOpen} onClose={() => setNoDealersPopupOpen(false)} maxWidth="sm" fullWidth>
            <p></p>

            <DialogContent>
              {city === 'ALL' ? (
                <>
                  <p style={{ textAlign: 'center', padding: '30px' }}>
                    На жаль, цей автомобіль наразі недоступний у тест-парках. <br />
                    <b>Ви можете залишити заявку дилеру на індивідуальний тест-драйв у конкретному місті.</b>
                  </p>
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
                      fontFamily: 'HyundaiSansHeadMedium',
                    }}
                    onClick={() => {
                      setAllPopupShown(true);
                      setNoDealersPopupOpen(false);
                    }}
                  >
                    Обрати місто та делера
                  </Button>
                </>
              ) : (
                <p style={{ textAlign: 'center', padding: '30px' }}>
                  На жаль, цей автомобіль зараз недоступний у тест-парку в обраному місті.
                  <br />
                  <b>Ви можете залишити заявку дилеру на індивідуальний тест-драйв.</b>
                </p>
              )}
            </DialogContent>

            <DialogActions>
              {city !== 'ALL' && (
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
                    fontFamily: 'HyundaiSansHeadMedium',
                  }}
                  onClick={() => {
                    setNoDealersPopupOpen(false);
                    handleLoadAllCityDealers(city);
                  }}
                  variant="contained"
                >
                  Обрати делера
                </Button>
              )}
            </DialogActions>
          </Dialog>

          {/* ===================== */}
          {/* CONTACTS SECTION */}
          {/* ===================== */}
          <Typography
            variant="h6"
            style={{
              marginTop: 20,
              color: '#000',
              fontSize: '18px',
              textAlign: 'left',
              fontFamily: 'HyundaiSansHeadMedium',
            }}
          >
            Введіть, будь ласка, контактні дані:
          </Typography>
          <Grid container spacing={2} style={{ marginBottom: '30px' }}>
            <ContactFields
              name={name}
              setName={setName}
              phone={phone}
              setPhone={setPhone}
              submitAttempted={submitAttempted}
            />
          </Grid>
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
                style={{
                  marginBottom: 6,
                  fontWeight: 500,
                  textAlign: 'left',
                  fontSize: '16px',
                  color: '#000',
                  fontFamily: 'HyundaiSansHeadMedium',
                }}
              >
                Дата тест-драйву:
              </Typography>

              <DateField
                value={date}
                onChange={(newDate) => {
                  setDate(newDate);

                  const slots = getAvailableTimeSlots(newDate);
                  setTime(slots[0]);
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                style={{
                  marginBottom: 6,
                  fontWeight: 500,
                  textAlign: 'left',
                  fontSize: '16px',
                  color: '#000',
                  fontFamily: 'HyundaiSansHeadMedium',
                }}
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
                disabled={!date}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                {timeSlots.map((slot) => (
                  <MenuItem key={slot} value={slot}>
                    {slot}
                  </MenuItem>
                ))}
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
            disabled={submitLoading}
            style={{
              width: '260px',
              lineHeight: '50px',
              height: '50px',
              background: submitLoading ? '#5b7595' : '#002c5f',
              color: '#fff',
              margin: '50px auto 60px',
              padding: '0 10px',
              cursor: submitLoading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              borderRadius: 0,
              textTransform: 'none',
              fontWeight: '400',
              fontFamily: 'HyundaiSansHeadMedium',
              display: 'flex',
            }}
            onClick={handleSubmit}
          >
            {submitLoading ? <span className="loader"></span> : 'Відправити'}
          </Button>
        </>
      )}

      {/* STEP 2 - SUCCESS */}
      {step === 2 && (
        <div style={{ textAlign: 'center', marginTop: 100 }}>
          <h2 style={{ color: '#000', marginTop: 50, marginBottom: 50, fontSize: '44px' }}>Дякуємо! </h2>
          <p style={{ color: '#000', marginTop: 50, marginBottom: 20, fontSize: '24px' }}>Ваша заявка надіслана.</p>
          <p style={{ color: '#000', fontSize: '24px' }}>Найближчим часом наш дилер зв’яжеться з Вами.</p>
          <p
            style={{
              color: '#000',
              marginTop: 50,
              marginBottom: 50,
              fontSize: '44px',
              fontFamily: 'HyundaiSansHeadMedium',
            }}
          >
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
