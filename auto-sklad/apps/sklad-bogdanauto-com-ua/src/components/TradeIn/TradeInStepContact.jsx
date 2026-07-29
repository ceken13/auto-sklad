import { Box, TextField, Typography, Button, Radio, RadioGroup, FormControlLabel, Checkbox } from '@mui/material';

import { Controller } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

export function TradeInStepContact({ control, errors, prevStep, handleFinalSubmit }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flex: '0.6' }}>
        <Typography
          mb={4}
          component="button"
          onClick={prevStep}
          sx={{
            background: 'none',
            border: 'none',
            padding: 0,
            mt: 5,
            cursor: 'pointer',
            color: '#0f6b5c',
            fontSize: '16px',
            textDecoration: 'underline',
            textUnderlineOffset: '4px',

            '&:hover': {
              opacity: 0.7,
            },
          }}
        >
          Повернутись назад
        </Typography>
        <Typography variant="h5" mb={4}>
          Контактна інформація
        </Typography>

        {/* ПІБ */}

        {/* Ім'я / По батькові / Прізвище */}

        <Box
          sx={{
            display: 'flex',
            gap: 3,
            mb: 3,
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
          }}
        >
          <Box flex={1}>
            <Typography mb={1}>
              Введіть ім’я<span style={{ color: 'red' }}>*</span>
            </Typography>

            <Controller
              name="firstName"
              control={control}
              rules={{
                required: 'Ім’я обов’язкове',
              }}
              render={({ field }) => (
                <TextField {...field} fullWidth error={!!errors.firstName} helperText={errors.firstName?.message} />
              )}
            />
          </Box>

          <Box flex={1}>
            <Typography mb={1}>Введіть По батькові:</Typography>

            <Controller
              name="middleName"
              control={control}
              render={({ field }) => <TextField {...field} fullWidth />}
            />
          </Box>

          <Box flex={1}>
            <Typography mb={1}>
              Введіть прізвище<span style={{ color: 'red' }}>*</span>
            </Typography>

            <Controller
              name="lastName"
              control={control}
              rules={{
                required: 'Прізвище обов’язкове',
              }}
              render={({ field }) => (
                <TextField {...field} fullWidth error={!!errors.lastName} helperText={errors.lastName?.message} />
              )}
            />
          </Box>
        </Box>

        {/* Телефон */}

        <Typography mb={1}>
          Введіть ваш телефон<span style={{ color: 'red' }}>*</span>:
        </Typography>

        <Controller
          name="phone"
          control={control}
          rules={{
            required: 'Вкажіть телефон',
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              placeholder="+38 (000) 000-00-00"
              error={!!errors.phone}
              helperText={errors.phone?.message}
              InputProps={{
                inputComponent: IMaskInput,
                inputProps: {
                  mask: '+{38} (000) 000-00-00',
                },
              }}
              sx={{ mb: 3 }}
            />
          )}
        />

        {/* Email */}

        <Typography mb={1}>
          Введіть ваш e-mail<span style={{ color: 'red' }}>*</span>:
        </Typography>

        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Вкажіть email',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Некоректний email',
            },
          }}
          render={({ field }) => (
            <TextField {...field} fullWidth error={!!errors.email} helperText={errors.email?.message} sx={{ mb: 3 }} />
          )}
        />

        {/* Метод комунікації */}

        <Typography mb={1}>
          Метод комунікації<span style={{ color: 'red' }}>*</span>
        </Typography>

        <Controller
          name="contactMethod"
          control={control}
          rules={{
            required: 'Оберіть метод комунікації',
          }}
          render={({ field }) => (
            <RadioGroup
              {...field}
              sx={{
                mb: 3,
              }}
            >
              <FormControlLabel value="Viber" control={<Radio />} label="Viber" />

              <FormControlLabel value="WhatsApp" control={<Radio />} label="WhatsApp" />

              <FormControlLabel value="SMS" control={<Radio />} label="SMS" />

              <FormControlLabel value="Telegram" control={<Radio />} label="Telegram" />
            </RadioGroup>
          )}
        />

        {errors.contactMethod && (
          <Typography color="error" fontSize={14} mb={2}>
            {errors.contactMethod.message}
          </Typography>
        )}

        {/* Час контакту */}

        <Typography mb={1}>Зручний час для зв’язку:</Typography>

        <Controller
          name="contactTime"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              rows={3}
              fullWidth
              placeholder="Напишіть, будь ласка,  свої коментарі"
              sx={{ mb: 3 }}
            />
          )}
        />

        {/* Згода */}

        <Controller
          name="agreement"
          control={control}
          rules={{
            required: 'Необхідно погодитись з обробкою персональних даних',
          }}
          render={({ field }) => (
            <Box>
              <FormControlLabel
                control={<Checkbox checked={field.value} onChange={field.onChange} />}
                label={
                  <>
                    Даю згоду на обробку персональних даних
                    <span style={{ color: 'red' }}>*</span>
                  </>
                }
              />

              {errors.agreement && (
                <Typography color="error" fontSize={14}>
                  {errors.agreement.message}
                </Typography>
              )}
            </Box>
          )}
        />

        {/* Кнопки */}

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mt: 5,
          }}
        >
          <Button
            variant="contained"
            onClick={handleFinalSubmit}
            sx={{
              backgroundColor: '#0f6b5c',
              width: '100%',
            }}
          >
            Надіслати дані на оцінку експерту
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default TradeInStepContact;
