import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

import { Controller } from 'react-hook-form';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import { TradeInFileUpload } from './TradeInFileUpload';
import { useEffect, useState } from 'react';
import { getDealers } from '../../api/dealers.api';

export function TradeInStepVehicle({ control, errors, watch, setValue, trigger, nextStep }) {
  const autoRiaEnabled = watch('autoRiaEnabled');
  const autoRiaUrl = watch('autoRiaUrl');
  const vehicleData = watch(['brand', 'model', 'year', 'mileage', 'transmission', 'engine', 'condition', 'loan']);
  const photos = watch('photos');
  const dealer = watch('dealer');

  const canNext = autoRiaEnabled ? !!autoRiaUrl : vehicleData.every(Boolean) && photos?.length > 0 && !!dealer;
  const [dealers, setDealers] = useState([]);
  const handleNext = async () => {
    console.log('handleNext');

    if (autoRiaEnabled) {
      const valid = await trigger(['autoRiaUrl', 'dealer']);

      if (valid) {
        nextStep();
      }

      return;
    }

    const valid = await trigger([
      'brand',
      'model',
      'year',
      'mileage',
      'transmission',
      'engine',
      'condition',
      'loan',
      'bodyType',
      'dealer',
    ]);

    if (valid) {
      nextStep();
    }
  };
  useEffect(() => {
    const loadDealers = async () => {
      try {
        const data = await getDealers();
        setDealers(data);
      } catch (e) {
        console.error(e);
      }
    };

    loadDealers();
  }, []);

  return (
    <Box>
      <Box>
        <Typography mb={1}>Для подачі заявки, заповніть, будь ласка, наступні поля:</Typography>

        <Controller
          name="autoRiaEnabled"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.checked);

                    if (e.target.checked) {
                      setValue('brand', '');
                      setValue('model', '');
                      setValue('year', '');
                      setValue('mileage', '');
                      setValue('vin', '');
                      setValue('plateNumber', '');
                      setValue('transmission', '');
                      setValue('engine', '');
                      setValue('bodyType', '');
                      setValue('condition', '');
                      setValue('conditionComment', '');
                      setValue('loan', '');
                    }
                  }}
                />
              }
              label="Авто є на https://auto.ria"
            />
          )}
        />

        <Controller
          name="autoRiaUrl"
          control={control}
          rules={{
            validate: (value) => {
              if (!watch('autoRiaEnabled')) {
                return true;
              }

              if (!value) {
                return 'Вкажіть посилання Auto RIA';
              }

              const autoRiaRegex = /^https:\/\/(www\.)?auto\.ria\.com\/.+/i;

              if (!autoRiaRegex.test(value)) {
                return 'Вкажіть коректне посилання Auto RIA';
              }

              return true;
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              disabled={!autoRiaEnabled}
              label="Посилання на AUTO.RIA"
              error={!!errors.autoRiaUrl}
              helperText={errors.autoRiaUrl?.message}
              sx={{
                mb: 4,
                mt: 2,
              }}
            />
          )}
        />
        <Typography mb={4}>Чи</Typography>
        <Box
          sx={{
            opacity: autoRiaEnabled ? 0.5 : 1,
            pointerEvents: autoRiaEnabled ? 'none' : 'auto',
          }}
        >
          {/* Марка / Модель */}
          <Box>
            <Typography mb={1}>
              Марка автомобіля<span style={{ color: 'red' }}>*</span>:
            </Typography>
            <Controller
              name="brand"
              control={control}
              render={({ field }) => <TextField sx={{ mb: 3 }} {...field} fullWidth error={!!errors.brand} />}
            />
            <Typography mb={1}>
              Модель автомобіля<span style={{ color: 'red' }}>*</span>:
            </Typography>
            <Controller
              name="model"
              control={control}
              render={({ field }) => <TextField sx={{ mb: 3 }} {...field} fullWidth />}
            />
          </Box>

          {/* Рік / Пробіг */}
          <Box>
            <Typography mb={1}>
              Рік<span style={{ color: 'red' }}>*</span>:
            </Typography>
            <Controller
              name="year"
              control={control}
              rules={{
                required: 'Вкажіть рік',
                validate: (value) => {
                  if (!/^\d{4}$/.test(value)) {
                    return 'Рік повинен містити 4 цифри';
                  }

                  const year = Number(value);

                  if (year < 1900 || year > 2100) {
                    return 'Рік повинен бути від 1900 до 2100';
                  }

                  return true;
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  sx={{ mb: 3 }}
                  error={!!errors.year}
                  helperText={errors.year?.message}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                    field.onChange(value);
                  }}
                  inputProps={{
                    inputMode: 'numeric',
                  }}
                />
              )}
            />
            <Typography mb={1}>
              Пробіг<span style={{ color: 'red' }}>*</span>:
            </Typography>
            <Controller
              name="mileage"
              control={control}
              rules={{
                required: 'Вкажіть пробіг',
                pattern: {
                  value: /^\d+$/,
                  message: 'Пробіг повинен містити лише цифри',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  sx={{ mb: 3 }}
                  error={!!errors.mileage}
                  helperText={errors.mileage?.message}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                  }}
                />
              )}
            />
          </Box>

          {/* VIN / Номер */}
          <Box>
            <Typography mb={1}>VIN:</Typography>
            <Controller
              name="vin"
              control={control}
              render={({ field }) => <TextField sx={{ mb: 3 }} {...field} fullWidth />}
            />
            <Typography mb={1}>Державний номер:</Typography>
            <Controller
              name="plateNumber"
              control={control}
              render={({ field }) => <TextField sx={{ mb: 3 }} {...field} fullWidth />}
            />
          </Box>

          {/* КПП / Двигун */}
          <Box>
            <Typography mb={1}>
              КПП<span style={{ color: 'red' }}>*</span>:
            </Typography>
            <Controller
              name="transmission"
              control={control}
              render={({ field }) => (
                <TextField sx={{ mb: 3 }} {...field} select fullWidth>
                  <MenuItem value="Механіка">Механіка</MenuItem>
                  <MenuItem value="Автомат">Автомат</MenuItem>
                  <MenuItem value="Робот">Робот</MenuItem>
                  <MenuItem value="Варіатор">Варіатор</MenuItem>
                </TextField>
              )}
            />
            <Typography mb={1}>
              Двигун<span style={{ color: 'red' }}>*</span>:
            </Typography>
            <Controller
              name="engine"
              control={control}
              render={({ field }) => <TextField sx={{ mb: 3 }} {...field} fullWidth />}
            />
          </Box>

          {/* Тип кузова */}
          <Typography mb={1}>
            Тип кузова<span style={{ color: 'red' }}>*</span>:
          </Typography>
          <Controller
            name="bodyType"
            control={control}
            render={({ field }) => <TextField sx={{ mb: 3 }} {...field} fullWidth />}
          />

          {/* Стан */}

          <Typography mb={1}>
            Стан авто<span style={{ color: 'red' }}>*</span>
          </Typography>

          <Controller
            name="condition"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field} sx={{ mb: 3 }}>
                <FormControlLabel value="Відмінний" control={<Radio />} label="Відмінний" />
                <FormControlLabel value="Робочий" control={<Radio />} label="Робочий" />
                <FormControlLabel value="Потребує ремонту" control={<Radio />} label="Потребує ремонту" />
              </RadioGroup>
            )}
          />
          <Controller
            name="conditionComment"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Опишіть, будь ласка,  стан автомобіля"
                multiline
                rows={3}
                fullWidth
                sx={{ mb: 3 }}
              />
            )}
          />
          <Typography mb={1}>
            Авто в кредиті<span style={{ color: 'red' }}>*</span>
          </Typography>

          <Controller
            name="loan"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field}>
                <FormControlLabel value="yes" control={<Radio />} label="Так" />

                <FormControlLabel value="no" control={<Radio />} label="Ні" />
              </RadioGroup>
            )}
          />
          {/* Фото */}
          <TradeInFileUpload control={control} />

          <Typography mb={1}>Бажаний новий автомобіль:</Typography>
          <Controller
            name="desiredCar"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Напишіть, будь ласка,  свої коментарі"
                multiline
                rows={3}
                fullWidth
                sx={{ mb: 3 }}
              />
            )}
          />
        </Box>
        <Typography mb={1}>
          Обрати дилерський центр<span style={{ color: 'red' }}>*</span>
        </Typography>

        <Controller
          name="dealer"
          control={control}
          rules={{
            required: 'Оберіть дилерський центр',
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              select
              fullWidth
              sx={{ mb: 3 }}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            >
              <MenuItem value="">
                <em>Оберіть дилерський центр</em>
              </MenuItem>

              {dealers.map((dealer) => (
                <MenuItem key={dealer.dealerCode} value={dealer.dealerName}>
                  {dealer.dealerName}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Typography mb={1}>
          <span style={{ color: 'red' }}>*</span>Поля обов’язкові для заповнення
        </Typography>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={!canNext}
          sx={{
            mt: 5,
            width: '100%',
            backgroundColor: '#0f6b5c',
            '&:disabled': {
              backgroundColor: '#cccccc',
            },
          }}
        >
          Далі
        </Button>
      </Box>
    </Box>
  );
}

export default TradeInStepVehicle;
