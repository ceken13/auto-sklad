import { apiClient } from './client';

export const getFilters = async (organizationSlug) => {
  const response = await apiClient.get('/filters?organizationSlug=hyundai-kyiv', {
    params: {
      organizationSlug,
    },
  });

  return response.data;
};
