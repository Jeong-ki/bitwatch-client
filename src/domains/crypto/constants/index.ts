export const UpbitBaseURL = process.env.NEXT_PUBLIC_UPBIT_API_URL as string;

export const DEBOUNCE_DELAY = 300;

export const CurrencyTabs = [
  { text: '원화', currency: 'KRW' },
  { text: 'BTC', currency: 'BTC' },
  { text: 'USDT', currency: 'USDT' },
  { text: '관심', currency: 'FAV' }
] as const;
export type Currency = (typeof CurrencyTabs)[number]['currency'];

export const DummyFavorites = [
  { market: 'KRW-ETH', korean_name: '이더리움', english_name: 'Ethereum' },
  { market: 'BTC-ETH', korean_name: '비트코인', english_name: 'Bitcoin' },
  { market: 'USDT-BTC', korean_name: '비트코인', english_name: 'Bitcoin' },
  { market: 'USDT-ETH', korean_name: '이더리움', english_name: 'Ethereum' },
  { market: 'USDT-JTO', korean_name: '지토', english_name: 'Jito' }
];
