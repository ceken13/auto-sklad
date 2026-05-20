import { useEffect, useState } from 'react';
import { getCarByVin } from '../api/cars.api';

export function useCar(vinCode) {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!vinCode) return;

    const fetchCar = async () => {
      try {
        setLoading(true);
        const data = await getCarByVin(vinCode);
        setCar(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [vinCode]);

  return { car, loading, error };
}
