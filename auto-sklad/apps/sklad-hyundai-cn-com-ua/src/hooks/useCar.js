import { useEffect, useState } from 'react';
import { getCarByVin } from '../api/cars.api';
import { getOrganizationSlug } from '../utils/getOrganizationSlug';

export function useCar(vinCode) {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!vinCode) return;

    const fetchCar = async () => {
      try {
        setLoading(true);
        const organizationSlug = getOrganizationSlug();
        const data = await getCarByVin(vinCode);
        // const data = await getCarByVin(vinCode, organizationSlug);

        console.log('CARinfo:', data);

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
