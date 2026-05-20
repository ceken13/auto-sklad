import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Layout } from '../Layout/Layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../api/admin.api';

export function UserAuthorization() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const data = await adminLogin({
        username: form.username,
        password: form.password,
      });

      console.log(data);

      localStorage.setItem('token', data.accessToken);

      navigate('/admin');
    } catch (error) {
      console.error(error);

      alert('Невірний логін або пароль');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 10 }}>
      <Typography variant="h5" mb={2}>
        Вхід
      </Typography>

      <TextField
        label="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Password"
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
