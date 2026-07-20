import { apiClient } from './client';

export const getFilters = async (params = {}) => {
  const response = await apiClient.get('/filters', {
    params,
  });

  return response.data;
};
