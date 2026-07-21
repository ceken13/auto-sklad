import { apiClient } from './client';

// GET
export const getColors = async () => {
  const response = await apiClient.get('/admin/colors');
  return response.data;
};

// PUT (створення / оновлення)
export const upsertColor = async (payload) => {
  const response = await apiClient.put('/admin/colors', payload);
  return response.data;
};

// DELETE
export const deleteColor = async (sourceColor) => {
  await apiClient.delete('/admin/colors', {
    params: {
      sourceColor,
    },
  });
};
