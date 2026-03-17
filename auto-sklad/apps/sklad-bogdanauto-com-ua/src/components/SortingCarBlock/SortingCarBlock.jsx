import { Box, Typography, Chip, Stack, MenuItem, Button, Menu } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { useState } from 'react';
import { theme } from '../../theme';
import { getStyles } from './styles';
import CloseIcon from '@mui/icons-material/Close';
import { CarBlockCard } from './CarBlockCard';
import { carsMock } from './carsMock';
import { Pagination } from '@mui/material';

export function SortingCarBlock() {
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
  const selectedCars = carsMock.slice(startIndex, startIndex + carsPerPage);

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
            <Chip sx={styles.chipSt} label="HAVAL" size="small" deleteIcon={<CloseIcon />} />
            <Chip sx={styles.chipSt} label="H5" size="small" deleteIcon={<CloseIcon />} />
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
        <CarBlockCard
          carBrand={data.carBrand}
          model={data.model}
          imgCar={data.imgCar}
          bealerName={data.bealerName}
          dealerSity={data.dealerSity}
          engine={data.engine}
          year={data.year}
          exteriorColor={data.exteriorColor}
          regularPrice={data.regularPrice}
          loanRepayment={data.loanRepayment}
          specialOffer={data.specialOffer}
          pickUpOffer={data.pickUpOffer}
          availablCar={data.availablCar}
        />
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
