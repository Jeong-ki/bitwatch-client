/**
 * @title 업비트 > 종목 코드 조회
 * @api GET /market/all
 */

import { QueryConfig } from '@/lib/react-query';
import { UpbitBaseURL } from '../constants';
import { useQuery } from '@tanstack/react-query';

export interface MarketInfo {
  market: string;
  korean_name: string;
  english_name: string;
}

export const getMarketAll = async (): Promise<MarketInfo[]> => {
  const res = await fetch(`${UpbitBaseURL}/market/all`);
  if (!res.ok) {
    throw new Error('Failed to fetch market list');
  }
  return res.json();
};

export const getMarketAllQueryOptions = () => {
  return {
    queryKey: ['marketList'],
    queryFn: getMarketAll,
    staleTime: 1000 * 60 * 30 // 30분
  };
};

type UseMarketListOptions = {
  queryConfig?: QueryConfig<typeof getMarketAllQueryOptions>;
};

export const useMarketList = ({ queryConfig }: UseMarketListOptions = {}) => {
  return useQuery({
    ...getMarketAllQueryOptions(),
    ...queryConfig
  });
};
