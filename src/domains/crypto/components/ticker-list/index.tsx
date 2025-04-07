'use client';

import { useUpbitTicker } from '../../hooks/useUpbitTicker';
import CryptoCard from '../crypto-card';
import styles from './index.module.scss';

export const TickerList = () => {
  // 관심있는 마켓 코드 목록
  const markets = ['KRW-BTC', 'KRW-ETH', 'KRW-XRP', 'KRW-SOL'];

  // 웹소켓 데이터 구독
  const { isLoading, error } = useUpbitTicker(markets);

  if (error) {
    return <div className={styles.error}>에러 발생: {`${error}`}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>실시간 시세</h1>

      {isLoading ? (
        <p className={styles.loading}>연결 중...</p>
      ) : (
        <div className={styles.grid}>
          {markets.map(market => (
            <CryptoCard
              key={market}
              marketCode={market}
            />
          ))}
        </div>
      )}
    </div>
  );
};
