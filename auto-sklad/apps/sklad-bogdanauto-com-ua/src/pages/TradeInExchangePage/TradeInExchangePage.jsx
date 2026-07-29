import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { TradeInForm } from '../../components/TradeIn';
import { useParams } from 'react-router-dom';

export function TradeInExchangePage() {
  const { id } = useParams();

  return (
    <>
      <Header />
      <TradeInForm id={id} />
      <Footer />
    </>
  );
}

export default TradeInExchangePage;
