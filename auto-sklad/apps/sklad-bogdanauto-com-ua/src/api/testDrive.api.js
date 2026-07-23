import { apiClient } from './client';

export const sendTestDriveRequest = async (payload) => {
  const response = await apiClient.post('/test-drives', payload);

  return response.data;
};
