export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  TIMEOUT: 10000,
};

export const getApiUrl = (endpoint: string) => {
  const base = API_CONFIG.BASE_URL.endsWith('/') 
    ? API_CONFIG.BASE_URL.slice(0, -1) 
    : API_CONFIG.BASE_URL;
  
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  return `${base}${path}`;
};
