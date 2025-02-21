import { MarketInfo } from './types';

/**
 * @title 업비트 > 종목 코드 조회
 * @api GET /crypto/market
 */
export const getMarketAll = async (): Promise<MarketInfo[]> => {
  const res = await fetch('/api/crypto/market');

  if (!res.ok) {
    throw new Error('Failed to fetch market list');
  }

  return res.json();
};
