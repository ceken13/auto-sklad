import { useState } from 'react';
import { Box, Button, Stack, TextField, Checkbox, FormControlLabel } from '@mui/material';

export function OrganizationForm({ onSubmit, initialData = null }) {
  const [form, setForm] = useState({
    slug: initialData?.slug || '',
    name: initialData?.name || '',
    dealerCode: initialData?.dealerCode || '',
    dealerCity: initialData?.dealerCity || '',
    inUkraine: initialData?.inUkraine || false,
  });

  const handleCheckboxChange = (e) => {
    setForm((prev) => ({
      ...prev,
      inUkraine: e.target.checked,
    }));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      slug: form.slug.trim(),
      name: form.name.trim(),
      dealerCode: form.dealerCode.trim(),
      dealerCity: form.dealerCity.trim(),
      inUkraine: form.inUkraine,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Slug"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          required
          fullWidth
          helperText="Наприклад: hyundai-zp"
        />

        <TextField label="Назва організації" name="name" value={form.name} onChange={handleChange} required fullWidth />

        <TextField label="Dealer Code" name="dealerCode" value={form.dealerCode} onChange={handleChange} fullWidth />

        <TextField label="Dealer City" name="dealerCity" value={form.dealerCity} onChange={handleChange} fullWidth />

        <FormControlLabel
          control={<Checkbox checked={form.inUkraine} onChange={handleCheckboxChange} />}
          label="Авто в Україні"
        />

        <Button type="submit" variant="contained">
          {initialData ? 'Оновити' : 'Створити'}
        </Button>
      </Stack>
    </Box>
  );
}

export default OrganizationForm;
