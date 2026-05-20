import { apiClient } from './client';

export const adminLogin = async (payload) => {
  const response = await apiClient.post('/auth/login', payload);

  return response.data;
};

export const getAdminCars = async () => {
  const response = await apiClient.get('/admin/cars');

  return response.data;
};
