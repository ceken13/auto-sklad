const BASE_URL = 'https://api-os.bogdanauto.com.ua';

export const getMediaUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${BASE_URL}${path}`;
};
