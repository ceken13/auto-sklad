import { apiClient } from './client';

export const getFilters = async (params = {}) => {
  const response = await apiClient.get('/filters?organizationSlug=hyundai-cn', {
    params,
  });

  return response.data;
};
