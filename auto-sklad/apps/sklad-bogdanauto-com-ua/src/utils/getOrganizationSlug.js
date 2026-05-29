export const getOrganizationSlug = () => {
  const host = window.location.hostname;

  // Агрегатор
  if (host.includes('bogdanauto.com.ua') || host.includes('localhost')) {
    return 'default';
  }

  if (host.includes('hyundai-zp')) return 'hyundai-zp';
  if (host.includes('hyundai-ck')) return 'hyundai-ck';
  if (host.includes('hyundai-kyiv')) return 'hyundai-kyiv';
  if (host.includes('hyundai-volyn')) return 'hyundai-volyn';
  if (host.includes('hyundai-if')) return 'hyundai-if';
  if (host.includes('hyundai-cn')) return 'hyundai-cn';
  if (host.includes('kr-bogdanauto.hyundai')) return 'kr-bogdanauto.hyundai';

  return 'default';
};
