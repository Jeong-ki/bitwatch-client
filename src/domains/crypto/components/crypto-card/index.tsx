import styles from './index.module.scss';
import { useUpbitTickerByMarket } from '../../hooks/useUpbitTickerByMarket';

const CryptoCard = ({ marketCode }: { marketCode: string }) => {
  const { data, isLoading } = useUpbitTickerByMarket(marketCode);

  if (isLoading || !data) {
    return (
      <div className={styles.loadingCard}>
        <p>로딩 중...</p>
      </div>
    );
  }

  const getPriceChangeClass = () => {
    if (data.change === 'RISE') return styles.priceRise;
    if (data.change === 'FALL') return styles.priceFall;
    return styles.priceEven;
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{marketCode}</h3>
      <p className={styles.price}>
        현재가:{' '}
        <span className={getPriceChangeClass()}>
          {data.trade_price.toLocaleString()} 원
        </span>
      </p>
      <p className={`${styles.changeRate} ${getPriceChangeClass()}`}>
        전일대비: {data.signed_change_rate > 0 ? '+' : ''}
        {(data.signed_change_rate * 100).toFixed(2)}% (
        {data.signed_change_price > 0 ? '+' : ''}
        {data.signed_change_price.toLocaleString()} 원)
      </p>
      <div className={styles.details}>
        <p>고가: {data.high_price.toLocaleString()} 원</p>
        <p>저가: {data.low_price.toLocaleString()} 원</p>
        <p>거래량: {data.acc_trade_volume_24h.toFixed(2)}</p>
        <p>거래대금: {(data.acc_trade_price_24h / 1000000).toFixed(0)}백만</p>
      </div>
      <p className={styles.timestamp}>
        최종 업데이트: {new Date(data.timestamp).toLocaleTimeString()}
      </p>
    </div>
  );
};

export default CryptoCard;
