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
//import { carsMock } from '../SortingCarBlock/carsMock';
import { useCar } from '../../hooks/useCar';
import { useParams } from 'react-router-dom';
import { Loader } from '../ui/Loader';
import { CarPageSkeleton } from '../ui/CarPageSkeleton';

export function MainLayoutCarPage() {
  const styles = getStyles(theme);
  const navigate = useNavigate();
  //const car = carsMock.find((item) => item?.id === Number(id));
  const { id } = useParams();
  const { car, loading, error } = useCar(id);
  if (loading) {
    return (
      <Layout>
        <CarPageSkeleton />
      </Layout>
    );
  }
  if (error) {
    return <Typography color="error">Помилка завантаження авто</Typography>;
  }
  if (!car) {
    return <Typography>Авто не знайдено</Typography>;
  }
  return (
    <Layout>
      <Typography variant="h1">Онлайн склад Богдан-Авто Черкаси</Typography>
      <Typography
        onClick={() => navigate(-1)}
        sx={{ cursor: 'pointer', color: '#000', fontFamily: 'HyundaiSansHeadRegular, sans-serif' }}
      >
        Повернутись назад
      </Typography>
      <Box sx={styles.flexWrap}>
        <Box sx={{ flex: 1 }}>
          <SliderBlock car={car} />
        </Box>
        <Box sx={{ flex: 1, width: { xs: '100%', sm: 'initial' } }}>
          <MainCharacteristics car={car} />
        </Box>
      </Box>
      <Box sx={styles.flexWrap}>
        <Box sx={{ flex: 1, width: { xs: '100%', sm: 'initial' } }}>
          <TechnicalPerformance car={car} />
        </Box>
        <Box sx={{ flex: 1, width: { xs: '100%', sm: 'initial' } }}>
          <CarDimensions car={car} />
        </Box>
      </Box>
      <OptionalEquipment car={car} />
    </Layout>
  );
}

export default MainLayoutCarPage;
