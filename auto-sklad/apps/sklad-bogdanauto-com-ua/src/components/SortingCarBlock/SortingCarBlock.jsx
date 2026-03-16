import { Box, Typography, Chip, Stack, MenuItem, Button, Menu } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { useState } from 'react';
import { theme } from '../../theme';
import { getStyles } from './styles';
import CloseIcon from '@mui/icons-material/Close';
import { CarBlockCard } from './CarBlockCard';
import { carsMock } from './carsMock';

export function SortingCarBlock() {
  const styles = getStyles(theme);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
      {carsMock.map((data) => (
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
        />
      ))}
    </>
  );
}

export default SortingCarBlock;
