import { Box, Typography, Chip, Stack, MenuItem, Button, Menu } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { useState } from 'react';
import { theme } from '../../theme';
import { getStyles } from './styles';
import CloseIcon from '@mui/icons-material/Close';
import { CarBlockCard } from './CarBlockCard';
import { useFilters } from '../../context/FilterContext';
import { carsMock } from './carsMock';
import { Pagination } from '@mui/material';

export function SortingCarBlock() {
  const { filters } = useFilters();

  const styles = getStyles(theme);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [page, setPage] = useState(1);
  const carsPerPage = 8;
  const startIndex = (page - 1) * carsPerPage;

  const selectedCars = carsMock
    .filter((car) => {
      const brandMatch =
        filters.brands.length === 0 || filters.brands.map((c) => c.toLowerCase()).includes(car.brand.toLowerCase());

      const modelMatch =
        filters.models.length === 0 || filters.models.map((c) => c.toLowerCase()).includes(car.model.toLowerCase());
      const trimLevelMatch =
        filters.trimLevels.length === 0 ||
        filters.trimLevels.map((c) => c.toLowerCase()).includes(car.trimLevel.toLowerCase());
      const enginesMatch =
        filters.engines.length === 0 || filters.engines.map((c) => c.toLowerCase()).includes(car.engine.toLowerCase());
      const fuelTypesMatch =
        filters.fuelTypes.length === 0 ||
        filters.fuelTypes.map((c) => c.toLowerCase()).includes(car.fuelType.toLowerCase());
      const transmissionsMatch =
        filters.transmissions.length === 0 ||
        filters.transmissions.map((c) => c.toLowerCase()).includes(car.transmission.toLowerCase());
      const driveTypesMatch =
        filters.driveTypes.length === 0 ||
        filters.driveTypes.map((c) => c.toLowerCase()).includes(car.driveType.toLowerCase());

      const exteriorColorsMatch =
        filters.exteriorColors.length === 0 ||
        filters.interiorColors.map((c) => c.toLowerCase()).includes(car.exteriorColor.toLowerCase());

      const interiorColorsMatch =
        filters.interiorColors.length === 0 ||
        filters.interiorColors.map((c) => c.toLowerCase()).includes(car.interiorColor.toLowerCase());

      const yearsMatch =
        filters.years.length === 0 || filters.years.map((c) => c.toLowerCase()).includes(car.year.toLowerCase());

      const carPrice = Number(car.regularPrice.replace(/\s/g, ''));
      const priceMatch = carPrice >= filters.regularPrice[0] && carPrice <= filters.regularPrice[1];
      const usedMatch = !filters.usedCars || car.usedCars;
      const availablCarsMatch = !filters.availablCars || car.availablCar;
      const inUkraineMatch = !filters.inUkraineCars || car.inUkraine;
      const specialOfferCarsMatch = !filters.specialOfferCars || car.specialOffer;
      const pickUpOfferCarsMatch = !filters.pickUpOfferCars || car.pickUpOffer;

      return (
        brandMatch &&
        modelMatch &&
        trimLevelMatch &&
        enginesMatch &&
        fuelTypesMatch &&
        priceMatch &&
        usedMatch &&
        transmissionsMatch &&
        driveTypesMatch &&
        exteriorColorsMatch &&
        interiorColorsMatch &&
        yearsMatch &&
        availablCarsMatch &&
        inUkraineMatch &&
        specialOfferCarsMatch &&
        pickUpOfferCarsMatch
      );
    })
    .slice(startIndex, startIndex + carsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Box sx={styles.topWrapper}>
        {/* Ліва частина */}
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            25 автомобілів H5 доступні зараз
          </Typography>

          <Stack direction="row" spacing={1}>
            <Chip
              sx={styles.chipSt}
              label="HAVAL"
              size="small"
              onDelete={() => console.log('delete')}
              deleteIcon={<CloseIcon />}
            />
            <Chip
              sx={styles.chipSt}
              label="H5"
              size="small"
              onDelete={() => console.log('delete')}
              deleteIcon={<CloseIcon />}
            />
          </Stack>
        </Box>
        {/* Права частина */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="filter" onClick={handleOpen} endIcon={<TuneIcon />}>
            Сортувати за
          </Button>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Ціна ↑</MenuItem>
            <MenuItem onClick={handleClose}>Ціна ↓</MenuItem>
          </Menu>
        </Box>
      </Box>
      {selectedCars.map((data) => (
        <CarBlockCard key={data.id} data={data} />
      ))}

      {/* Пагінація */}
      {carsMock.length > carsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={Math.ceil(carsMock.length / carsPerPage)}
            page={page}
            onChange={handleChangePage}
            sx={{
              mb: 1,
              '& .MuiPaginationItem-root': {
                color: '#999',
                borderRadius: '8px',
              },
              '& .Mui-selected': {
                backgroundColor: 'transparent',
                color: '#000',
                fontWeight: 'bold',
              },
            }}
          />
        </Box>
      )}
    </>
  );
}

export default SortingCarBlock;
