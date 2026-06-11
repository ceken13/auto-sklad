import { apiClient } from './client';

export const getFilters = async (organizationSlug) => {
  const response = await apiClient.get('/filters?organizationSlug=hyundai-zp', {
    params: {
      organizationSlug,
    },
  });

  return response.data;
};
