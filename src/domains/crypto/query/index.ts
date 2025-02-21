import { useQuery } from '@tanstack/react-query';
import { MarketInfo } from '../api/types';
import { getMarketAll } from '../api';

export function useMarketListQuery() {
  return useQuery<MarketInfo[], Error>({
    queryKey: ['marketList'],
    queryFn: getMarketAll,
    staleTime: 1000 * 60 * 30 // 30분
  });
}
