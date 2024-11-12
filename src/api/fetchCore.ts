type METHOD = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';

interface FetchOptions {
  params?: Record<string, any>;
  body?: any;
  headers?: Record<string, string>;
}

const fetchCoreConfig = async (url: string, method: METHOD, options?: FetchOptions) => {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  };

  if (method !== 'GET' && options?.body) {
    config.body = JSON.stringify(options.body);
  }

  const queryParams = options?.params ? `?${new URLSearchParams(options.params).toString()}` : '';

  const baseURL = process.env.NEXT_PUBLIC_API_URL as string;
  return fetch(baseURL + url + queryParams, config);
};

export const getFetch = async <T>(url: string, options?: FetchOptions): Promise<T> => {
  const response = await fetchCoreConfig(url, 'GET', options);
  return response.json();
};

export const postFetch = async <T>(url: string, body: any, options?: FetchOptions): Promise<T> => {
  const response = await fetchCoreConfig(url, 'POST', { ...options, body });
  return response.json();
};

export const putFetch = async <T>(url: string, body: any, options?: FetchOptions): Promise<T> => {
  const response = await fetchCoreConfig(url, 'PUT', { ...options, body });
  return response.json();
};

export const patchFetch = async <T>(url: string, body: any, options?: FetchOptions): Promise<T> => {
  const response = await fetchCoreConfig(url, 'PATCH', { ...options, body });
  return response.json();
};

export const deleteFetch = async <T>(url: string, options?: FetchOptions): Promise<T> => {
  const response = await fetchCoreConfig(url, 'DELETE', options);
  return response.json();
};
