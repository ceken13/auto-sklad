import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api-os.bogdanauto.com.ua/api/v1',
  // baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('organizationSlug');

      window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);
