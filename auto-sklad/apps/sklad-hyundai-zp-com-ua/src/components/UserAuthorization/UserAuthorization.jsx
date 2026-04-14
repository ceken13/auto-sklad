import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Layout } from '../Layout/Layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function UserAuthorization() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    console.log(form.email, form.password);
    if (form.email === 'kate@gmail.com' && form.password === '123') {
      localStorage.setItem('token', 'fake-token');
      navigate('/admin');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 10 }}>
      <Typography variant="h5" mb={2}>
        Вхід
      </Typography>

      <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth margin="normal" />

      <TextField
        label="Пароль"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
        Увійти
      </Button>
    </Box>
  );
}

export default UserAuthorization;
