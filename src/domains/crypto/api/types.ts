export interface MarketInfo {
  market: string;
  korean_name: string;
  english_name: string;
}

export interface TickerInfo {
  market: string;
  trade_price: number;
  signed_change_rate: number;
}
