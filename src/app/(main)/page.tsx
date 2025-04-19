import { TickerList } from '@/domains/crypto/components/ticker-list';
import CryptoChart from '@/domains/crypto/components/crypto-chart';

export default function Home() {
  return (
    <div className="content-home">
      <section className="content-main">
        <CryptoChart marketCode="KRW-ETH" />
        <TickerList />
      </section>
      <div className="center_line">
        <div className="line" />
      </div>
      <div className="content-aside">
        right area <p>test area</p>
        <p>test area333</p>
        <p>test area333</p>
        <p>real test99119911</p>
      </div>
    </div>
  );
}
