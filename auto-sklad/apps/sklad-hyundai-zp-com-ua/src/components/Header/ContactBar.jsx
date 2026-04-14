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
        alignItems: 'center',
        gap: 1,
        paddingLeft: '20px',
      }}
    >
      <img
        style={styles.imgTel}
        src="https://hyundai.com.ua/sites/all/themes/responsive/img/if_aiga_telephone_134148.svg"
      />

      <Typography sx={{ fontSize: '14px' }}>
        <strong>Салон:</strong>{' '}
        <a style={styles.linkTel} href="tel:+380931432050">
          (093) 143 20 50
        </a>
        , <strong>СТО:</strong>{' '}
        <a style={styles.linkTel} href="tel:+380732698305">
          (073) 269 83 05
        </a>
        ,{' '}
        <a style={styles.linkTel} href="tel:+380931702287">
          (093) 170 22 87
        </a>
      </Typography>
    </Box>
  );
}
