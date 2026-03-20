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

export function MainLayoutCarPage() {
  const styles = getStyles(theme);
  const navigate = useNavigate();

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
          {carsMock.map((data) => (
            <MainCharacteristics
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
              pickUpOffer={data.pickUpOffer}
              availablCar={data.availablCar}
              trimLevel={data.trimLevel}
              fuelType={data.fuelType}
              transmission={data.transmission}
            />
          ))}
        </Box>
      </Box>
      <Box sx={styles.flexWrap}>
        <Box sx={{ flex: 1 }}>
          <TechnicalPerformance />
        </Box>
        <Box sx={{ flex: 1 }}>
          <CarDimensions />
        </Box>
      </Box>
      <OptionalEquipment />
    </Layout>
  );
}

export default MainLayoutCarPage;
