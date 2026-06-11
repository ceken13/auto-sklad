import { theme } from '../../theme.ts';
import { getStyles } from './styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export function PickUpLabel() {
  const styles = getStyles(theme);

  return (
    <Box sx={styles.pickUpLabel}>
      <AccessTimeIcon sx={styles.icon} />
      Забрати за 60 хвилин
    </Box>
  );
}

export default PickUpLabel;
