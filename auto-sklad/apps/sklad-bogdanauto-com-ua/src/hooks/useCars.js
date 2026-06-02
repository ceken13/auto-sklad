import { useEffect, useState } from 'react';
import { getCars } from '../api/cars.api';
import { getOrganizationSlug } from '../utils/getOrganizationSlug';

export function useCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const organizationSlug = getOrganizationSlug();
        setLoading(true);

        {
          /*  const data = await getCars(organizationSlug); якщо виводити + додані через адмінку*/
        }
        const data = await getCars();
        console.log('CARS FROM HOMEPAGE+organizationSlug:', data);
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
