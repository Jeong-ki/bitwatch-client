import { getQueryClient } from '@/lib/react-query';
import useTickerSocket from '../store/ticker-socket';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

export const useUpbitTicker = (markets: string[]) => {
  const queryClient = getQueryClient();
  const { connect, disconnect, data, connected, error } = useTickerSocket();

  useEffect(() => {
    connect(markets);

    return () => {
      disconnect();
    };
  }, [markets.join(',')]);

  // 웹소켓 데이터가 업데이트될 때마다 React Query 캐시 업데이트
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      // 각 마켓별로 캐시 업데이트
      Object.entries(data).forEach(([marketCode, tickerData]) => {
        queryClient.setQueryData(['upbit', 'ticker', marketCode], tickerData);
      });

      // 전체 데이터 캐시 업데이트
      queryClient.setQueryData(['upbit', 'ticker'], data);
    }
  }, [data, queryClient]);

  // React Query를 사용하여 데이터 제공
  return useQuery({
    queryKey: ['upbit', 'ticker'],
    queryFn: () => data,
    initialData: {},
    refetchOnWindowFocus: false,
    staleTime: Infinity, // 웹소켓에서 직접 업데이트하므로 staleTime을 무한으로 설정
    enabled: connected,
    meta: {
      error,
      isConnected: connected
    }
  });
};
