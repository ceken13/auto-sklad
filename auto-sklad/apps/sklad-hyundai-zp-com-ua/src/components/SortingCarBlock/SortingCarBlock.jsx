import { Box, Typography, Button, Menu, MenuItem, Pagination } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { useMemo, useState } from 'react';
import { theme } from '../../theme';
import { getStyles } from './styles';
import { CarBlockCard } from './CarBlockCard';
import { useFilters } from '../../context/FilterContext';
import { carsMock } from './carsMock';

export function SortingCarBlock() {
  const { filters } = useFilters();

  const styles = getStyles(theme);

  const [anchorEl, setAnchorEl] = useState(null);
  const [sortOrder, setSortOrder] = useState(null); // 'asc' | 'desc' | null
  const [page, setPage] = useState(1);

  const carsPerPage = 8;

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // =========================
  // 1. FILTER
  // =========================
  const filteredCars = useMemo(() => {
    return carsMock.filter((car) => {
      const brandMatch =
        filters.brands.length === 0 ||
        filters.brands.map((c) => c?.toLowerCase()).includes(car.carBrand?.toLowerCase());

      const modelMatch =
        filters.models.length === 0 || filters.models.map((c) => c?.toLowerCase()).includes(car.model?.toLowerCase());

      const trimLevelMatch =
        filters.trimLevels.length === 0 ||
        filters.trimLevels.map((c) => c?.toLowerCase()).includes(car.trimLevel?.toLowerCase());

      const engineMatch =
        filters.engines.length === 0 ||
        filters.engines.map((c) => c?.toLowerCase()).includes(car.engine?.toLowerCase());

      const fuelMatch =
        filters.fuelTypes.length === 0 ||
        filters.fuelTypes.map((c) => c?.toLowerCase()).includes(car.fuelType?.toLowerCase());

      const transmissionMatch =
        filters.transmissions.length === 0 ||
        filters.transmissions.map((c) => c?.toLowerCase()).includes(car.transmission?.toLowerCase());

      const driveMatch =
        filters.driveTypes.length === 0 ||
        filters.driveTypes.map((c) => c?.toLowerCase()).includes(car.driveType?.toLowerCase());

      const exteriorColorMatch =
        filters.exteriorColors.length === 0 ||
        filters.exteriorColors.map((c) => c?.toLowerCase()).includes(car.exteriorColor?.toLowerCase());

      const interiorColorMatch =
        filters.interiorColors.length === 0 ||
        filters.interiorColors.map((c) => c?.toLowerCase()).includes(car.interiorColor?.toLowerCase());

      const yearMatch =
        filters.years.length === 0 || filters.years.map((c) => c?.toLowerCase()).includes(car.year?.toLowerCase());

      const price = Number(car.regularPrice.replace(/\s/g, ''));

      const priceMatch = price >= filters.regularPrice[0] && price <= filters.regularPrice[1];

      const usedMatch = !filters.usedCars || car.usedCars;
      const availableMatch = !filters.availableCars || car.availableCar;
      const inUkraineMatch = !filters.inUkraineCars || car.inUkraine;
      const specialOfferMatch = !filters.specialOfferCars || car.specialOffer;
      const pickUpMatch = !filters.pickUpOfferCars || car.pickUpOffer;

      return (
        brandMatch &&
        modelMatch &&
        trimLevelMatch &&
        engineMatch &&
        fuelMatch &&
        transmissionMatch &&
        driveMatch &&
        exteriorColorMatch &&
        interiorColorMatch &&
        yearMatch &&
        priceMatch &&
        usedMatch &&
        availableMatch &&
        inUkraineMatch &&
        specialOfferMatch &&
        pickUpMatch
      );
    });
  }, [filters]);

  // =========================
  // 2. SORT
  // =========================
  const sortedCars = useMemo(() => {
    if (!sortOrder) return filteredCars;

    return [...filteredCars].sort((a, b) => {
      const priceA = Number(a.regularPrice.replace(/\s/g, ''));
      const priceB = Number(b.regularPrice.replace(/\s/g, ''));

      return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });
  }, [filteredCars, sortOrder]);

  // =========================
  // 3. PAGINATION
  // =========================
  const paginatedCars = useMemo(() => {
    const startIndex = (page - 1) * carsPerPage;
    return sortedCars.slice(startIndex, startIndex + carsPerPage);
  }, [sortedCars, page]);

  const handleChangePage = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* TOP BAR */}
      <Box sx={styles.topWrapper}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>{sortedCars.length}</strong> автомобілів доступно зараз
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="filter" onClick={handleOpen} endIcon={<TuneIcon />}>
            Сортувати за
          </Button>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                setSortOrder('asc');
                setPage(1);
                handleClose();
              }}
            >
              Ціна ↑
            </MenuItem>

            <MenuItem
              onClick={() => {
                setSortOrder('desc');
                setPage(1);
                handleClose();
              }}
            >
              Ціна ↓
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* CAR LIST */}
      {paginatedCars.map((car) => (
        <CarBlockCard key={car.id} data={car} />
      ))}

      {/* PAGINATION */}
      {sortedCars.length > carsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'end', mt: 4 }}>
          <Pagination
            count={Math.ceil(sortedCars.length / carsPerPage)}
            page={page}
            onChange={handleChangePage}
            sx={{
              mb: 1,
              '& .MuiPaginationItem-root': {
                color: '#999',
                borderRadius: '0px',
              },
              '& .MuiPaginationItem-root.Mui-selected': {
                color: '#fff',
                fontWeight: 'bold',
                backgroundColor: '#002C5E',
              },
            }}
          />
        </Box>
      )}
    </>
  );
}

export default SortingCarBlock;
