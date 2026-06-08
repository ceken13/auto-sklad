import { theme } from '../../theme';
import { getStyles } from './styles';
import { Box, Container, Typography } from '@mui/material';

export function Footer() {
  const styles = getStyles(theme);
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1c1b1b',
        color: '#fff',
        mt: 8,
        pt: 4,
        pb: 4,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          gap: { xs: 4, md: 10 },
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* логотип */}
        <Box
          component="img"
          src="https://hyundai.com.ua/sites/default/files/inline/images/white-logo.svg"
          sx={{ height: 32 }}
        />

        {/* текст */}
        <Typography sx={{ color: '#999', fontSize: '12px', textAlign: { xs: 'center', md: 'left' } }}>
          © 2026 | Хюндай Мотор Україна | Усі права захищені <br />
          Розміщена на цьому сайті інформація щодо наявності продукції, її характеристик, (орієнтовних) цін, інших умов
          її продажу, а також умов надання будь-яких послуг не є пропозицією укласти договір (офертою). Така інформація
          стосується наявних на складах Товариства автомобілів, щодо яких здійснене митне оформлення; вона може не бути
          остаточною і підлягає уточненню у відповідного дилерського центру Hyundai.
        </Typography>
      </Container>
    </Box>
  );
}
export default Footer;
