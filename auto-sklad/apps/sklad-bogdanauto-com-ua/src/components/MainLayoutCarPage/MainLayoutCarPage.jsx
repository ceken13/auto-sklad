import { theme } from '../../theme.ts';
import { getStyles } from './styles';
import Typography from '@mui/material/Typography';
import { Layout } from '../Layout/Layout';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { SliderBlock } from './SliderBlock';
import { MainCharacteristics } from './MainCharacteristics';
import { TechnicalPerformance } from './TechnicalPerformance';
import { CarDimensions } from './CarDimensions';
import { OptionalEquipment } from './OptionalEquipment';
import { carsMock } from '../SortingCarBlock/carsMock';

export function MainLayoutCarPage({ id }) {
  const styles = getStyles(theme);
  const navigate = useNavigate();
  const car = carsMock.find((item) => item?.id === Number(id));

  return (
    <Layout>
      <Typography variant="h1">ОНЛАЙН СКЛАД</Typography>
      <Typography onClick={() => navigate(-1)} sx={{ cursor: 'pointer', color: '#000' }}>
        Повернутись назад
      </Typography>
      <Box sx={styles.flexWrap}>
        <Box sx={{ flex: 1 }}>
          <SliderBlock />
        </Box>
        <Box sx={{ flex: 1 }}>
          <MainCharacteristics car={car} />
        </Box>
      </Box>
      <Box sx={styles.flexWrap}>
        <Box sx={{ flex: 1 }}>
          <TechnicalPerformance car={car} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <CarDimensions car={car} />
        </Box>
      </Box>
      <OptionalEquipment />
    </Layout>
  );
}

export default MainLayoutCarPage;
