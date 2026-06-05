import { apiClient } from './client';

export const getFilters = async (organizationSlug) => {
  const response = await apiClient.get('/filters', {
    params: {
      organizationSlug,
    },
  });

  return response.data;
};
