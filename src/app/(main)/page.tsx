'use client';

import { useMarketListQuery } from '@/domains/crypto/query';

export default function Home() {
  const {
    data: marketList = [],
    isLoading: marketLoading,
    error: marketError
  } = useMarketListQuery();

  console.log(marketList, marketLoading, marketError);

  return <div>홈</div>;
}
