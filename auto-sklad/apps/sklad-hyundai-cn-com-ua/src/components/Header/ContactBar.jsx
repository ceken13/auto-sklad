import { Box, Typography } from '@mui/material';

import { getStyles } from './styles';
import { theme } from '../../theme';

export function ContactBar() {
  const styles = getStyles(theme);
  return (
    <Box
      sx={{
        backgroundColor: '#fcfcfc',
        display: 'flex',
        alignItems: { xs: 'initial', md: 'center' },
        gap: 1,
        paddingLeft: '20px',
        justifyContent: { xs: 'end', md: 'initial' },
        paddingRight: { xs: '20px', md: 'initial' },
      }}
    >
      <img
        style={styles.imgTel}
        src="https://hyundai.com.ua/sites/all/themes/responsive/img/if_aiga_telephone_134148.svg"
      />

      <Typography sx={{ fontSize: { xs: '16px', md: '16px' } }}>
        <strong>Салон:</strong>{' '}
        <a style={styles.linkTel} href="tel:0631423241">
          0631423241
        </a>
        , <strong>СТО:</strong>
        <Box component="br" sx={{ display: { xs: 'block', md: 'none' } }} />{' '}
        <a style={styles.linkTel} href="tel:0734329392">
          0734329392
        </a>
      </Typography>
    </Box>
  );
}
