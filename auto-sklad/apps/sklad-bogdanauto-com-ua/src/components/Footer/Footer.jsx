import { theme } from '../../theme';
import { getStyles } from './styles';
import { Box, Container, Typography } from '@mui/material';

export function Footer() {
  const styles = getStyles(theme);
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#0f0f0f',
        color: '#fff',
        mt: 8,
        pt: 4,
        pb: 4,
      }}
    >
      <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        {/* логотип */}

        <Box
          component="img"
          src="https://bogdanauto.com.ua/wp-content/themes/bah-theme/images/icons/logo-white.svg"
          alt="Bogdan"
          sx={{ height: 32 }}
        />

        {/* текст */}
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255)', fontSize: '12px' }}>
          © BOGDAN. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
export default Footer;
