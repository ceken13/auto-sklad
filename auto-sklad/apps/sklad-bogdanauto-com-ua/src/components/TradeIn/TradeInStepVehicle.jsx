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
import { useEffect } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { TradeInFileUpload } from './TradeInFileUpload';

export function TradeInStepVehicle({ control, errors, watch, setValue, trigger, nextStep }) {
  const autoRiaEnabled = watch('autoRiaEnabled');

  const autoRiaUrl = watch('autoRiaUrl');

  const vehicleData = watch(['brand', 'model', 'year', 'mileage', 'transmission', 'engine', 'condition', 'loan']);

  const photos = watch('photos');

  const canNext = autoRiaEnabled ? !!autoRiaUrl : vehicleData.every(Boolean) && photos?.length > 0;

  const handleNext = async () => {
    if (autoRiaEnabled) {
      if (!autoRiaUrl) {
        return;
      }

      nextStep();
      return;
    }

    const valid = await trigger(['brand', 'model', 'year', 'mileage', 'transmission', 'engine', 'condition', 'loan']);

    if (valid) {
      nextStep();
    }
  };
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
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              disabled={!autoRiaEnabled}
              label="Посилання на AUTO.RIA"
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
              render={({ field }) => <TextField sx={{ mb: 3 }} {...field} fullWidth />}
            />
            <Typography mb={1}>
              Пробіг<span style={{ color: 'red' }}>*</span>:
            </Typography>
            <Controller
              name="mileage"
              control={control}
              render={({ field }) => <TextField sx={{ mb: 3 }} {...field} fullWidth />}
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
            render={({ field }) => <TextField sx={{ mb: 3 }} {...field} fullWidth sx={{ mb: 3 }} />}
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
          <Typography mb={1}>
            <span style={{ color: 'red' }}>*</span>Поля обов’язкові для заповнення
          </Typography>
        </Box>
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
