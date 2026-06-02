import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Layout } from '../Layout/Layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../api/admin.api';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

export function UserAuthorization() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: '',
    organizationSlug: '',
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
        ...(form.organizationSlug && {
          organizationSlug: form.organizationSlug,
        }),
      });

      console.log(data);

      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('organizationSlug', form.organizationSlug);

      navigate('/admin');
    } catch (error) {
      console.error(error);
      console.log(error.response?.data);
      console.log(error.response?.status);

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
      <FormControl fullWidth margin="normal">
        <InputLabel>Організація</InputLabel>

        <Select name="organizationSlug" value={form.organizationSlug} label="Організація" onChange={handleChange}>
          <MenuItem value="hyundai-zp">Богдан-Авто Запоріжжя</MenuItem>
          <MenuItem value="hyundai-ck">Богдан-Авто Черкаси</MenuItem>
          <MenuItem value="hyundai-kyiv">Богдан Авто (Київ, Новоконстантинівська)</MenuItem>
          <MenuItem value="hyundai-volyn">Богдан-Авто Луцьк</MenuItem>
          <MenuItem value="hyundai-if">Богдан Авто Івано-Франківськ</MenuItem>
          <MenuItem value="hyundai-cn">Богдан-Авто Чернігів</MenuItem>
          <MenuItem value="kr-bogdanauto.hyundai">Богдан-Авто Кропивницький</MenuItem>
          <MenuItem value="default">БАХ</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
        Увійти
      </Button>
    </Box>
  );
}

export default UserAuthorization;
