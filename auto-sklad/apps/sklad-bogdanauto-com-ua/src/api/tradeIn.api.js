import { apiClient } from './client';

export const sendTradeInRequest = async (payload) => {
  const response = await apiClient.post('/trade-in', payload);

  return response.data;
};

export const uploadTradeInImage = async (file) => {
  const formData = new FormData();

  formData.append('file', file);

  const response = await apiClient.post('/admin/media/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.url;
};
