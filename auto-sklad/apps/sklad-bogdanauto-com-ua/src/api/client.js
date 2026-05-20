import axios from 'axios';

export const apiClient = axios.create({
  /* baseURL: 'https://api-os.bogdanauto.com.ua/api/v1', */
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});
