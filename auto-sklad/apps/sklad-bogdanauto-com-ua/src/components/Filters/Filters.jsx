import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { theme } from '../../theme';
import { getStyles } from './styles';

export function Filters() {
  const styles = getStyles(theme);
  return (
    <Box>
      <Box sx={styles.layoutFilters}>
        <Box>Тут будуть фільтри</Box>
      </Box>
      <Button variant="contained" color="primary">
        Очистити всі фільтри
      </Button>
    </Box>
  );
}

export default Filters;
