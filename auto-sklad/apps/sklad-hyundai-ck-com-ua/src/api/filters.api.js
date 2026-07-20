import { apiClient } from './client';

export const getFilters = async (params = {}) => {
  const response = await apiClient.get('/filters?organizationSlug=hyundai-ck', {
    params,
  });

  return response.data;
};
