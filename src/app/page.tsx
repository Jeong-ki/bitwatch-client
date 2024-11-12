import { Button } from '@/components/common/button';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="container-landing">
      <main>
        <div className="content-landing">
          <div className="inner-content">
            <div className="badge">Intelligent Asset Management</div>
            <h1>워치</h1>
            <div className="gradient-text">Coin Alarm</div>
          </div>
          <div className="description">워치 설명</div>
          <button className="btn btn_medium landing-btn" type="button">
            <Link href="/login">워치 시작하기</Link>
          </button>
          <Button size="large" color="primary">
            버튼
          </Button>
        </div>
      </main>
    </div>
  );
}
