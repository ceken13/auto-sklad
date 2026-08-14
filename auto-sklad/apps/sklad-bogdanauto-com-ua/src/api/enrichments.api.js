import { apiClient } from './client';

// GET ALL
export const getConfigurationEnrichments = async () => {
  const response = await apiClient.get('/admin/configuration-enrichments');

  return response.data;
};
// GET CONFIGURATION TREE
export const getConfigurationEnrichmentTree = async () => {
  const response = await apiClient.get('/admin/configuration-enrichments/tree');

  return response.data;
};

// CREATE
export const createConfigurationEnrichment = async (payload) => {
  const response = await apiClient.post('/admin/configuration-enrichments', payload);

  return response.data;
};

// DELETE
export const deleteConfigurationEnrichment = async (id) => {
  const response = await apiClient.delete(`/admin/configuration-enrichments/${id}`);

  return response.data;
};
// UPDATE (POST)
export const updateConfigurationEnrichment = async (payload) => {
  const response = await apiClient.post('/admin/configuration-enrichments', payload);

  return response.data;
};
