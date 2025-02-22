import { useQuery } from '@tanstack/react-query';
import { MarketInfo, TickerInfo } from '../api/types';
import { getMarketAll, getTicker } from '../api';

export function useMarketListQuery() {
  return useQuery<MarketInfo[], Error>({
    queryKey: ['marketList'],
    queryFn: getMarketAll,
    staleTime: 1000 * 60 * 30 // 30분
  });
}

export function useTickerQuery(markets: string[]) {
  return useQuery<TickerInfo[], Error>({
    queryKey: ['ticker', markets.join(',')],
    queryFn: () => getTicker(markets),
    enabled: markets.length > 0,
    staleTime: 1000 * 10 // 10초
  });
}
