import { apiClient } from './client';

const getOrganizationSlug = () => {
  return localStorage.getItem('organizationSlug');
};

// GET ALL
export const getStoreRules = async (organizationSlugOverride) => {
  const organizationSlug = organizationSlugOverride || getOrganizationSlug();

  const response = await apiClient.get('/admin/store-rules', {
    params: { organizationSlug },
  });

  return response.data;
};

// GET ONE
export const getStoreRule = async (storeId, organizationSlugOverride) => {
  const organizationSlug = organizationSlugOverride || getOrganizationSlug();

  const response = await apiClient.get(`/admin/store-rules/${storeId}`, {
    params: { organizationSlug },
  });

  return response.data;
};

// UPSERT
export const upsertStoreRule = async (storeId, payload, organizationSlugOverride) => {
  const organizationSlug = organizationSlugOverride || getOrganizationSlug();

  const response = await apiClient.put(`/admin/store-rules/${storeId}`, payload, {
    params: { organizationSlug },
  });

  return response.data;
};

// DELETE
export const deleteStoreRule = async (storeId, organizationSlugOverride) => {
  const organizationSlug = organizationSlugOverride || getOrganizationSlug();

  const response = await apiClient.delete(`/admin/store-rules/${storeId}`, {
    params: { organizationSlug },
  });

  return response.data;
};
