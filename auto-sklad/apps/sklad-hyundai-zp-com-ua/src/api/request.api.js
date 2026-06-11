import { apiClient } from './client';

export const sendCarRequest = async (payload) => {
  const response = await apiClient.post('/car-request', payload);

  return response.data;
};
