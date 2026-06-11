import { apiClient } from './client';

export const getFilters = async (organizationSlug) => {
  const response = await apiClient.get('/filters?organizationSlug=hyundai-if', {
    params: {
      organizationSlug,
    },
  });

  return response.data;
};
