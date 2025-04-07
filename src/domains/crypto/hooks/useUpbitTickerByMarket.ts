import { getQueryClient } from '@/lib/react-query';
import { UpbitTickerResponse } from '../store/ticker-socket';
import { useQuery } from '@tanstack/react-query';

export const useUpbitTickerByMarket = (marketCode: string) => {
  const queryClient = getQueryClient();
  const allData = queryClient.getQueryData<Record<string, UpbitTickerResponse>>(
    ['upbit', 'ticker']
  );

  return useQuery({
    queryKey: ['upbit', 'ticker', marketCode],
    queryFn: () => allData?.[marketCode] || null,
    staleTime: Infinity,
    enabled: !!allData
  });
};
