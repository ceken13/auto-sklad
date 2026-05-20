import { apiClient } from './client';

export const getCars = async () => {
  const response = await apiClient.get('/carList');

  console.log('API RESPONSE:', response);

  return response.data.items;
};

export const getCarByVin = async (vinCode) => {
  const response = await apiClient.get(`/carList/${vinCode}`);
  return response.data;
};
