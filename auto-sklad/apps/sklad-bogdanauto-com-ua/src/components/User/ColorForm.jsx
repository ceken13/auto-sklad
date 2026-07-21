import { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Stack, TextField, Typography } from '@mui/material';

export default function ColorForm({ onSubmit, initialData, colors = [], onClose }) {
  const isEditMode = Boolean(initialData);

  const [form, setForm] = useState({
    sourceColor: '',
    displayColor: '',
  });

  useEffect(() => {
    if (!initialData) return;

    setForm({
      sourceColor: initialData.sourceColor ?? '',
      displayColor: initialData.displayColor ?? '',
    });
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.sourceColor.trim()) {
      alert('Виберіть sourceColor');
      return;
    }

    onSubmit({
      sourceColor: form.sourceColor.trim(),
      displayColor: form.displayColor.trim(),
    });
  };
  const availableColors = colors
    .filter((color) => {
      if (isEditMode) return true;

      return !color.displayColor;
    })
    .map((color) => color.sourceColor)
    .sort((a, b) => a.localeCompare(b));

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Typography variant="h5">
          {isEditMode ? 'Редагування перекладу кольору' : 'Створення перекладу кольору'}
        </Typography>

        <Autocomplete
          disabled={isEditMode}
          options={availableColors}
          value={form.sourceColor}
          onChange={(event, value) =>
            setForm((prev) => ({
              ...prev,
              sourceColor: value || '',
            }))
          }
          renderInput={(params) => (
            <TextField {...params} label="Колір зі стоку" required helperText="Почніть вводити назву кольору" />
          )}
        />

        <TextField
          label="Назва для сайту"
          value={form.displayColor}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              displayColor: e.target.value,
            }))
          }
          fullWidth
          helperText="Наприклад: Чорний, Білий, Морський синій"
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Button type="submit" variant="contained">
            {isEditMode ? 'Оновити' : 'Зберегти'}
          </Button>

          <Button variant="outlined" color="error" onClick={onClose}>
            Закрити
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
