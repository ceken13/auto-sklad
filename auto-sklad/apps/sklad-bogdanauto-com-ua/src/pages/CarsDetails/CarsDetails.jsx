import { Header } from '../../components/Header';
import { MainLayoutCarPage } from '../../components/MainLayoutCarPage';
import { Footer } from '../../components/Footer';
import { useParams } from 'react-router-dom';

export function CarsDetails() {
  const { id } = useParams();

  return (
    <>
      <Header />
      <MainLayoutCarPage id={id} />
      <Footer />
    </>
  );
}

export default CarsDetails;
