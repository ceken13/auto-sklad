import { apiClient } from './client';

export const sendCarRequest = async (payload) => {
  const response = await apiClient.post('/applications', payload);

  return response.data;
};
