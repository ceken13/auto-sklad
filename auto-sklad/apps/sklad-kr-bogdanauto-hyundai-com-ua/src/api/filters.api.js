import { apiClient } from './client';

export const getFilters = async (params = {}) => {
  const response = await apiClient.get('/filters?organizationSlug=kr-bogdanauto.hyundai', {
    params,
  });

  return response.data;
};
