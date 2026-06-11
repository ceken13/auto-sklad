import { apiClient } from './client';

export const getFilters = async (organizationSlug) => {
  const response = await apiClient.get('/filters?organizationSlug=kr-bogdanauto.hyundai', {
    params: {
      organizationSlug,
    },
  });

  return response.data;
};
