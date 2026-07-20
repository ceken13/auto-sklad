import { apiClient } from './client';

export const getFilters = async (params = {}) => {
  const response = await apiClient.get('/filters?organizationSlug=hyundai-volyn', {
    params,
  });

  return response.data;
};
