import { useQuery } from '@tanstack/react-query';

interface UpbitCandleParams {
  market: string;
  unit: number;
  count: number;
}

export interface UpbitCandle {
  market: string;
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  unit: number;
}

export const useUpbitCandles = ({ market, unit, count }: UpbitCandleParams) => {
  return useQuery({
    queryKey: ['upbit', 'candles', market, unit, count],
    queryFn: async () => {
      const response = await fetch(
        `https://api.upbit.com/v1/candles/minutes/${unit}?market=${market}&count=${count}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch candle data');
      }

      const data = await response.json();
      return data as UpbitCandle[];
    },
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30 // 30분
  });
};
