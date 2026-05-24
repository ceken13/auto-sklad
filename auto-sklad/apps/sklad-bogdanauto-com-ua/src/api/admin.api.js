import { apiClient } from './client';

// LOGIN
export const adminLogin = async (payload) => {
  const response = await apiClient.post('/auth/login', payload);
  return response.data;
};

// GET CARS
export const getAdminCars = async (organizationSlug) => {
  const response = await apiClient.get('/admin/cars', {
    params: {
      organizationSlug,
    },
  });

  return response.data;
};

// CREATE
export const createAdminCar = async (payload, organizationSlug) => {
  const response = await apiClient.post(`/admin/cars?organizationSlug=${organizationSlug}`, payload);
  return response.data;
};

// UPDATE
export const updateAdminCar = async (vinCode, organizationSlug, payload) => {
  const response = await apiClient.put(`/admin/cars/${vinCode}`, payload, {
    params: {
      organizationSlug,
    },
  });

  return response.data;
};

// DELETE
export const deleteAdminCar = async (vinCode, organizationSlug) => {
  const response = await apiClient.delete(`/admin/cars/${vinCode}`, {
    params: {
      organizationSlug,
    },
  });

  return response.data;
};

// ME
export const getAdminMe = async () => {
  const response = await apiClient.get('/admin/me');
  return response.data;
};
