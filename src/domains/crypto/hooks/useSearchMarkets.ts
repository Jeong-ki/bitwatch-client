import { useMemo, useState } from 'react';
import { useMarketListQuery, useTickerQuery } from '../queries';
import { useDebounce } from '@/hooks/useDebounce';
import { DEBOUNCE_DELAY } from '../constants';

export const useSearchMarkets = () => {
  const [keyword, setKeyword] = useState('');

  const debouncedKeyword = useDebounce(keyword, DEBOUNCE_DELAY);

  const { data: marketList = [], error: marketError } = useMarketListQuery();

  if (marketError) {
    console.error('MarketList Query Error: ', marketError);
  }

  const filteredMarkets = useMemo(() => {
    const lowerKeyword = debouncedKeyword.toLowerCase();
    return marketList.filter(
      m =>
        m.korean_name.includes(debouncedKeyword) ||
        m.english_name.toLowerCase().includes(lowerKeyword)
    );
  }, [marketList, debouncedKeyword]);

  const marketCodes = useMemo(
    () => filteredMarkets.map(m => m.market),
    [filteredMarkets]
  );

  const { data: tickerData = [], error: tickerError } =
    useTickerQuery(marketCodes);

  if (tickerError) {
    console.error('Ticker Query Error: ', tickerError);
  }

  const mergedData = useMemo(() => {
    return filteredMarkets.map(m => {
      const ticker = tickerData.find(t => t.market === m.market);
      return {
        ...m,
        trade_price: ticker?.trade_price ?? 0,
        signed_change_rate: ticker?.signed_change_rate ?? 0
      };
    });
  }, [filteredMarkets, tickerData]);

  return { keyword, setKeyword, marketsData: mergedData };
};
