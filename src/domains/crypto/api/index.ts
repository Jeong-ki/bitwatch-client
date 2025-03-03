import { upbitBaseURL } from '../constants';
import { MarketInfo, TickerInfo } from './types';

/**
 * @title 업비트 > 종목 코드 조회
 * @api GET /market/all
 */
export const getMarketAll = async (): Promise<MarketInfo[]> => {
  const res = await fetch(`${upbitBaseURL}/market/all`);
  if (!res.ok) {
    throw new Error('Failed to fetch market list');
  }
  const data = await res.json();
  return data.filter((item: any) => item.market.includes('KRW'));
};

/**
 * @abstract 업비트 > 종목별 현재가 조회
 * @api GET /crypto/ticker
 * @param markets - 종목 코드 (ex: KRW-BTC,KRW-ETH)
 */
export const getTicker = async (markets: string[]): Promise<TickerInfo[]> => {
  const query = markets.join(',');
  const res = await fetch(`${upbitBaseURL}/ticker?markets=${query}`);
  if (!res.ok) {
    throw new Error('Failed to fetch ticker list');
  }
  return res.json();
};
