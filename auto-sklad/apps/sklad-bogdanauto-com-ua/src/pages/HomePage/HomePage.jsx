import { Header } from '../../components/Header';
import { MainLayoutHomePage } from '../../components/MainLayoutHomePage';
import { Footer } from '../../components/Footer';

import { useEffect, useState } from 'react';
import { getCars } from '../../api/cars.api';

export function HomePage() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const data = await getCars();

        console.log('CARS FROM HOMEPAGE:', data);

        setCars(data); // поки просто зберігаємо
      } catch (error) {
        console.error('ERROR HOMEPAGE:', error);
      }
    };

    loadCars();
  }, []);

  return (
    <>
      <Header /> <MainLayoutHomePage />
      <Footer />{' '}
    </>
  );
}

export default HomePage;
