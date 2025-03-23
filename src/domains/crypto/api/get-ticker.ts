import { QueryConfig } from '@/lib/react-query';
import { UpbitBaseURL } from '../constants';
import { useQuery } from '@tanstack/react-query';

export interface TickerInfo {
  market: string;
  trade_price: number;
  signed_change_rate: number;
}

/**
 * @title 업비트 > 종목별 현재가 조회
 * @api GET /crypto/ticker
 * @param markets - 종목 코드 (ex: KRW-BTC,KRW-ETH)
 */
export const getTicker = async (markets: string[]): Promise<TickerInfo[]> => {
  const query = markets.join(',');
  const res = await fetch(`${UpbitBaseURL}/ticker?markets=${query}`);
  if (!res.ok) {
    throw new Error('Failed to fetch ticker list');
  }
  return res.json();
};

export const getTickerQueryOptions = (markets: string[]) => {
  return {
    queryKey: ['ticker', markets.join(',')],
    queryFn: () => getTicker(markets),
    enabled: markets.length > 0,
    staleTime: 1000 * 10 // 10초
  };
};

type UseTickerOptions = {
  queryConfig?: QueryConfig<typeof getTickerQueryOptions>;
};

export const useTicker = (
  markets: string[],
  { queryConfig }: UseTickerOptions = {}
) => {
  return useQuery({
    ...getTickerQueryOptions(markets),
    ...queryConfig
  });
};
