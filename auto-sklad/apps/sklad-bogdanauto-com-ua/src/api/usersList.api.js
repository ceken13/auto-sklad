import { apiClient } from './client';

// GET

export const getUsers = async (organizationSlug = '') => {
  const response = await apiClient.get('/admin/users', {
    params: organizationSlug ? { organizationSlug } : {},
  });

  return response.data;
};

// CREATE

export const createUser = async (payload) => {
  const response = await apiClient.post('/admin/users', payload);

  return response.data;
};

// DELETE

export const deleteUser = async (organizationSlug, username) => {
  const response = await apiClient.delete(`/admin/users/${organizationSlug}/${username}`);

  return response.data;
};
//  UPDATE (UPSERT)
export const upsertUser = async (payload) => {
  const response = await apiClient.post('/admin/users', payload);
  return response.data;
};
