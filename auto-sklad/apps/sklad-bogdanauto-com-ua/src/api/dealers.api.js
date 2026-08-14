import { apiClient } from './client';

export const getDealers = async () => {
  const response = await apiClient.get('/dealers');

  return response.data;
};
