import React, { useState } from 'react';
import { Box, Typography, Button, Stack, Pagination } from '@mui/material';

export default function AdminCarsList({ cars = [], onEdit, onDelete }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(cars.length / itemsPerPage);

  const paginatedCars = cars.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" mb={2}>
        Список авто ({cars.length} шт.)
      </Typography>

      {cars.length === 0 ? (
        <Typography>Авто відсутні</Typography>
      ) : (
        <>
          <Stack spacing={2}>
            {paginatedCars.map((car, index) => {
              const globalIndex = (page - 1) * itemsPerPage + index + 1;

              return (
                <Box
                  key={car.id}
                  sx={{
                    p: 2,
                    border: '1px solid #ccc',
                    borderRadius: 2,
                  }}
                >
                  <Typography>
                    #{globalIndex} — {car.carBrand} {car.model} (vin: {car.vinCode})
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
              );
            })}
          </Stack>

          <Box mt={3} display="flex" justifyContent="center">
            <Pagination count={pageCount} page={page} onChange={handlePageChange} color="primary" />
          </Box>
        </>
      )}
    </Box>
  );
}
