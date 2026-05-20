import { apiClient } from './client';

export const getFilters = async () => {
  const response = await apiClient.get('/filters');

  console.log('FILTERS API:', response);

  return response.data;
};
