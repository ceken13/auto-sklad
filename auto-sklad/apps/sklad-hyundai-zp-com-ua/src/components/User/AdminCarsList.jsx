import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';

export default function AdminCarsList({ cars = [], onEdit, onDelete }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" mb={2}>
        Список авто
      </Typography>

      {cars.length === 0 ? (
        <Typography>Авто відсутні</Typography>
      ) : (
        <Stack spacing={2}>
          {cars.map((car) => (
            <Box key={car.id} sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
              <Typography>
                {car.carBrand} {car.model} ({car.year})
              </Typography>

              <Stack direction="row" spacing={1} mt={1}>
                <Button variant="outlined" size="small" onClick={() => onEdit(car)}>
                  Редагувати
                </Button>
                <Button variant="outlined" size="small" color="error" onClick={() => onDelete(car.id)}>
                  Видалити
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}
