import { useEffect, useState } from 'react';
import { getConfigurationEnrichments } from '../api/enrichments.api';

export function useConfigurationEnrichments() {
  const [enrichments, setEnrichments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await getConfigurationEnrichments();
        setEnrichments(data || []);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { enrichments, loading, error };
}
