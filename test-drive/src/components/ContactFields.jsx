import { Grid, TextField, Typography } from '@mui/material';
import { PatternFormat } from 'react-number-format';

const phoneRegex = /^\d{9}$/;

export default function ContactFields({ name, setName, phone, setPhone, submitAttempted }) {
  const nameError = submitAttempted && !name.trim();
  const phoneError = submitAttempted && !phoneRegex.test(phone || '');

  return (
    <Grid container spacing={2} size={12} style={{ marginTop: 30 }}>
      {/* NAME */}
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
          Ваше ім’я: <span style={{ color: '#00aad2' }}>*</span>
        </Typography>

        <TextField
          fullWidth
          placeholder="Введіть Ім'я"
          value={name}
          onChange={(e) => {
            const onlyLetters = e.target.value.replace(/[^a-zA-Zа-яА-ЯіїєІЇЄґҐ\s']/g, '');
            setName(onlyLetters);
          }}
          error={nameError}
          helperText={nameError ? 'Обов’язкове поле' : ''}
          FormHelperTextProps={{
            style: {
              color: nameError ? 'red!important' : '#999999',
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 0,
            },
          }}
        />
      </Grid>

      {/* PHONE */}
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
          Номер телефона: <span style={{ color: '#00aad2' }}>*</span>
        </Typography>

        <PatternFormat
          format="+38 (0##) ###-##-##"
          mask="_"
          value={phone}
          allowEmptyFormatting
          onValueChange={(values) => {
            setPhone(values.value);
          }}
          customInput={TextField}
          fullWidth
          placeholder="+38 (0__) ___-__-__"
          error={phoneError}
          helperText={phoneError && submitAttempted ? 'Введіть коректний номер +38 (0XX) XXX-XX-XX' : ''}
          slotProps={{
            formHelperText: {
              style: {
                color: phoneError ? 'red' : '#999999',
              },
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 0,
            },
            '& input': {
              color: phone ? '#000' : '#999999',
            },
          }}
        />
      </Grid>
    </Grid>
  );
}
