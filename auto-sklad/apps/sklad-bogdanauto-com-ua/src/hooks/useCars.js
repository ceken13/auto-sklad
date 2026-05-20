import { useEffect, useState } from 'react';
import { getCars } from '../api/cars.api';

export function useCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);

        const data = await getCars();

        setCars(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return { cars, loading, error };
}
