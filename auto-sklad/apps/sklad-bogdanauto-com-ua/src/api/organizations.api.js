import { apiClient } from './client';

// GET ALL
export const getOrganizations = async () => {
  const response = await apiClient.get('/admin/organizations');
  return response.data;
};

// CREATE
export const createOrganization = async (payload) => {
  const response = await apiClient.post('/admin/organizations', payload);

  return response.data;
};

// DELETE
export const deleteOrganization = async (organizationSlug) => {
  const response = await apiClient.delete(`/admin/organizations/${organizationSlug}`);

  return response.data;
};
// UPDATE
export const updateOrganization = async (organizationSlug, payload) => {
  const response = await apiClient.put(`/admin/organizations/${organizationSlug}`, payload);

  return response.data;
};
// GET ONE BY SLUG
export const getOrganizationBySlug = async (organizationSlug) => {
  const response = await apiClient.get(`/admin/organizations/${organizationSlug}`);

  return response.data;
};
