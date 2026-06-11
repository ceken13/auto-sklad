import { Header } from '../../components/Header';
import { CarsRequestPage } from '../../components/CarsRequestPage';
import { Footer } from '../../components/Footer';
import { useParams } from 'react-router-dom';

export function CarsRequest() {
  const { id } = useParams();

  return (
    <>
      <Header />
      <CarsRequestPage id={id} />
      <Footer />
    </>
  );
}

export default CarsRequest;
