import { MarketInfo, TickerInfo } from './types';

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

/**
 * @abstract 업비트 > 종목별 현재가 조회
 * @api GET /crypto/ticker
 * @param markets - 종목 코드 (ex: KRW-BTC,KRW-ETH)
 */
export const getTicker = async (markets: string[]): Promise<TickerInfo[]> => {
  const query = markets.join(',');
  const res = await fetch(`/api/crypto/ticker?markets=${query}`);
  if (!res.ok) {
    throw new Error('Failed to fetch ticker list');
  }
  return res.json();
};
