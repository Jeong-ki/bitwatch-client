import { useMemo, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { Currency, DEBOUNCE_DELAY, DummyFavorites } from '../constants';
import { useMarketList } from '../api/get-markets';
import { useTicker } from '../api/get-ticker';

export const useSearchMarkets = (currency: Currency) => {
  const [keyword, setKeyword] = useState('');

  const debouncedKeyword = useDebounce(keyword, DEBOUNCE_DELAY);

  // TODO: API 개발 후 Query로 대체
  const dummyFavorites = DummyFavorites;
  const { data: marketList = [], error: marketError } = useMarketList();
  const convertedMarketList =
    currency === 'FAV'
      ? dummyFavorites
      : marketList
          .filter((item: any) => item.market.includes(`${currency}-`))
          .sort((a, b) => {
            const aFav = dummyFavorites.some(fav => fav.market === a.market);
            const bFav = dummyFavorites.some(fav => fav.market === b.market);
            return aFav === bFav ? 0 : aFav ? -1 : 1;
          });

  if (marketError) {
    console.error('MarketList Query Error: ', marketError);
  }

  const filteredMarkets = useMemo(() => {
    const lowerKeyword = debouncedKeyword.toLowerCase();
    return convertedMarketList.filter(
      m =>
        m.korean_name.includes(debouncedKeyword) ||
        m.english_name.toLowerCase().includes(lowerKeyword)
    );
  }, [convertedMarketList, debouncedKeyword]);

  const marketCodes = useMemo(
    () => filteredMarkets.map(m => m.market),
    [filteredMarkets]
  );

  const { data: tickerData = [], error: tickerError } = useTicker(marketCodes);

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
