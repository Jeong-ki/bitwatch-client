import { UpbitCandle } from '../hooks/useUpbitCandles';
import { UpbitTickerResponse } from '../store/ticker-socket';

/**
 * 일주일 전 가격과 현재 가격을 비교하여 변동액과 변동률을 계산하는 함수
 * @param {Object} prevData - 일주일 전 가격 데이터
 * @param {Object} currentData - 현재 가격 데이터
 * @returns {Object} - 변동액과 변동률을 포함한 결과 객체
 */
export const calculatePriceChange = (
  prevData: UpbitCandle,
  currentData: UpbitTickerResponse
) => {
  // 일주일 전 가격 (종가 기준)
  const prevPrice = prevData.trade_price;

  // 현재 가격
  const currentPrice = currentData.trade_price;

  // 변동액 계산
  const priceDifference = currentPrice - prevPrice;

  // 변동률 계산 (백분율)
  const percentageChange = (priceDifference / prevPrice) * 100;

  return {
    prevPrice: prevPrice,
    currentPrice: currentPrice,
    priceDifference: priceDifference,
    percentageChange: percentageChange.toFixed(2) + '%',
    increased: priceDifference > 0
  };
};
