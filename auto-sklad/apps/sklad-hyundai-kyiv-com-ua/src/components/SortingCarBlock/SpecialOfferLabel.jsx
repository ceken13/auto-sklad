import { theme } from '../../theme.ts';
import { getStyles } from './styles';
import Box from '@mui/material/Box';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export function SpecialOfferLabel() {
  const styles = getStyles(theme);

  return (
    <Box sx={styles.specialOfferLabel}>
      <ThumbUpIcon sx={styles.icon} />
      Спеціальна пропозиція
    </Box>
  );
}

export default SpecialOfferLabel;
