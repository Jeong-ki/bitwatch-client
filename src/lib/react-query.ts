import { QueryClient } from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        /**
         * 요청 실패시 재요청 횟수
         */
        retry: false,
        refetchOnWindowFocus: false
        /**
         * errorBounce 설정
         */
      }
    }
  });
}

let clientQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: make a new query client if we don't already have one
  if (!clientQueryClient) clientQueryClient = makeQueryClient();
  return clientQueryClient;
}
