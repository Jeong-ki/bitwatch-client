import { HTTP_STATUS } from '@/@types/enum';
import useAuthStore from '@/domains/auth/store';

type METHOD = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';

interface FetchOptions {
  params?: Record<string, any>;
  body?: any;
  headers?: Record<string, string>;
}

const fetchCoreConfig = async (
  url: string,
  method: METHOD,
  options?: FetchOptions
) => {
  const { accessToken, setAccessToken, clearAuth } = useAuthStore.getState();

  const config: RequestInit = {
    method,
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...options?.headers
    }
  };

  if (method !== 'GET' && options?.body) {
    config.body = JSON.stringify(options.body);
  }

  const queryParams = options?.params
    ? `?${new URLSearchParams(options.params).toString()}`
    : '';
  const baseURL = process.env.NEXT_PUBLIC_API_URL as string;

  try {
    const response = await fetch(baseURL + url + queryParams, config);

    if (response.status === HTTP_STATUS.UNAUTHORIZED) {
      console.warn('Access token expired. Attempting to refresh...');
      const refreshResponse = await fetch(`${baseURL}/user/refresh`, {
        method: 'POST',
        credentials: 'include'
      });
      console.log('refreshResponse: ', refreshResponse);

      if (!refreshResponse.ok) {
        clearAuth();
        throw new Error('Failed to refresh token');
      }

      const refreshData = await refreshResponse.json();
      setAccessToken(refreshData.data.accessToken);

      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${refreshData.data.accessToken}`
      };

      return await fetch(baseURL + url + queryParams, config);
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const getFetch = async <T>(
  url: string,
  options?: FetchOptions
): Promise<T> => {
  const response = await fetchCoreConfig(url, 'GET', options);
  return response.json();
};

export const postFetch = async <T>(
  url: string,
  body?: any,
  options?: FetchOptions
): Promise<T> => {
  const response = await fetchCoreConfig(url, 'POST', { ...options, body });
  return response.json();
};

export const putFetch = async <T>(
  url: string,
  body: any,
  options?: FetchOptions
): Promise<T> => {
  const response = await fetchCoreConfig(url, 'PUT', { ...options, body });
  return response.json();
};

export const patchFetch = async <T>(
  url: string,
  body: any,
  options?: FetchOptions
): Promise<T> => {
  const response = await fetchCoreConfig(url, 'PATCH', { ...options, body });
  return response.json();
};

export const deleteFetch = async <T>(
  url: string,
  options?: FetchOptions
): Promise<T> => {
  const response = await fetchCoreConfig(url, 'DELETE', options);
  return response.json();
};
