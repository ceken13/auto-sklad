import { useState } from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';

export function OrganizationForm({ onSubmit, initialData = null }) {
  const [form, setForm] = useState({
    slug: initialData?.slug || '',
    name: initialData?.name || '',
  });

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

        <Button type="submit" variant="contained">
          {initialData ? 'Оновити' : 'Створити'}
        </Button>
      </Stack>
    </Box>
  );
}

export default OrganizationForm;
