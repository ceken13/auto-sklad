import { apiClient } from './client';

export const getCars = async (organizationSlug) => {
  const response = await apiClient.get('/carList?organizationSlug=hyundai-cn', {
    params: organizationSlug ? { organizationSlug } : {},
  });

  // console.log('API RESPONSE:', response);

  return response.data.items;
};

export const getCarByVin = async (vinCode, organizationSlug) => {
  const response = await apiClient.get(`/carList/${vinCode}?organizationSlug=hyundai-cn`, {
    params: {
      organizationSlug,
    },
  });

  return response.data;
};
