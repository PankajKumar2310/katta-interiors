const rawBaseUrl = (import.meta as any).env?.VITE_API_URL || '';

const baseUrl = String(rawBaseUrl).replace(/\/$/, '');

export const apiUrl = (path: string) => {
  if (!baseUrl) return path;
  if (!path) return baseUrl;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};
