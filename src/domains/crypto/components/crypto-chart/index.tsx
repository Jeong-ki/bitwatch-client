'use client';

import { useEffect, useRef, useState } from 'react';
import {
  createChart,
  ColorType,
  IChartApi,
  ISeriesApi,
  Time
} from 'lightweight-charts';
import { useUpbitTickerByMarket } from '../../hooks/useUpbitTickerByMarket';
import { useUpbitCandles, UpbitCandle } from '../../hooks/useUpbitCandles';
import styles from './index.module.scss';
import { calculatePriceChange } from '../../utils';

interface CryptoChartProps {
  marketCode: string;
}

export default function CryptoChart({ marketCode }: CryptoChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const { data: tickerData } = useUpbitTickerByMarket(marketCode);
  const [lastCandleTime, setLastCandleTime] = useState<number | null>(null);
  const [currentCandle, setCurrentCandle] = useState<{
    open: number;
    high: number;
    low: number;
    close: number;
  } | null>(null);

  // 일주일치 데이터 가져오기
  const { data: historicalData } = useUpbitCandles({
    market: marketCode,
    unit: 60, // 60분 단위
    count: 168 // 24시간 * 7일
  });

  const calChangedPrice =
    tickerData && historicalData
      ? calculatePriceChange(
          historicalData[historicalData.length - 1],
          tickerData
        )
      : null;

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // 차트 초기화
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#ffffff' },
        textColor: '#333'
      },
      grid: {
        vertLines: { color: '#f0f0f0' },
        horzLines: { color: '#f0f0f0' }
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: '#f0f0f0',
        tickMarkFormatter: (time: number) => {
          const date = new Date(time * 1000);
          const month = date.getMonth() + 1;
          const day = date.getDate();
          return `${month}/${day}`;
        }
      }
    });

    // 캔들스틱 시리즈 생성
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#3182f6',
      downColor: '#f04452',
      borderVisible: false,
      wickUpColor: '#3182f6',
      wickDownColor: '#f04452',
      priceFormat: {
        type: 'price',
        precision: 0,
        minMove: 1
      }
    });

    // 시간 포맷터 설정
    chart.applyOptions({
      localization: {
        timeFormatter: (time: number) => {
          const date = new Date(time * 1000);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          return `${year}-${month}-${day} ${hours}:${minutes}`;
        }
      }
    });

    chartRef.current = chart;
    seriesRef.current = candlestickSeries;

    // 차트 크기 조정을 위한 리사이즈 핸들러
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  // 실시간 데이터 업데이트
  useEffect(() => {
    if (!tickerData || !seriesRef.current || !lastCandleTime) return;

    const currentTime = Math.floor(new Date().getTime() / 1000);
    const currentPrice = tickerData.trade_price;
    const thirtyMinutesInSeconds = 1800; // 30분
    const currentTimeSlot =
      Math.floor(currentTime / thirtyMinutesInSeconds) * thirtyMinutesInSeconds;

    // 새로운 시간대가 시작되었는지 확인 (30분 단위)
    if (currentTimeSlot > lastCandleTime) {
      // 새로운 캔들 시작
      const newCandle = {
        open: currentPrice,
        high: currentPrice,
        low: currentPrice,
        close: currentPrice
      };

      // 상태 업데이트
      setCurrentCandle(newCandle);
      setLastCandleTime(currentTimeSlot);

      // 차트 업데이트 (다음 프레임에서 실행)
      requestAnimationFrame(() => {
        if (seriesRef.current) {
          seriesRef.current.update({
            time: currentTimeSlot as Time,
            open: newCandle.open,
            high: newCandle.high,
            low: newCandle.low,
            close: newCandle.close
          });
        }
      });
    } else if (currentCandle) {
      // 현재 캔들 업데이트
      const updatedCandle = {
        ...currentCandle,
        high: Math.max(currentCandle.high, currentPrice),
        low: Math.min(currentCandle.low, currentPrice),
        close: currentPrice
      };

      // 상태 업데이트
      setCurrentCandle(updatedCandle);

      // 차트 업데이트 (다음 프레임에서 실행)
      requestAnimationFrame(() => {
        if (seriesRef.current) {
          seriesRef.current.update({
            time: lastCandleTime as Time,
            open: updatedCandle.open,
            high: updatedCandle.high,
            low: updatedCandle.low,
            close: updatedCandle.close
          });
        }
      });
    }

    // 차트 자동 스크롤 (최대 1초에 한 번만 실행)
    const scrollTimeout = setTimeout(() => {
      if (chartRef.current) {
        chartRef.current.timeScale().scrollToPosition(1, false);
      }
    }, 1000);

    return () => clearTimeout(scrollTimeout);
  }, [tickerData]);

  // 과거 데이터 설정
  useEffect(() => {
    if (!historicalData || !seriesRef.current) return;

    // 시간순으로 정렬
    const sortedData = [...historicalData].sort(
      (a, b) => a.timestamp - b.timestamp
    );

    // 중복 시간 제거 및 데이터 포맷팅
    const formattedData = sortedData.reduce(
      (acc: any[], candle: UpbitCandle) => {
        const timestamp = Math.floor(candle.timestamp / 1000);
        const oneHourInSeconds = 3600; // 1시간 = 3600초
        const timeSlot =
          Math.floor(timestamp / oneHourInSeconds) * oneHourInSeconds;

        // 이미 같은 시간의 데이터가 있는지 확인
        const existingIndex = acc.findIndex(item => item.time === timeSlot);

        if (existingIndex === -1) {
          // 새로운 시간 슬롯이면 추가
          acc.push({
            time: timeSlot as Time,
            open: candle.opening_price,
            high: candle.high_price,
            low: candle.low_price,
            close: candle.trade_price
          });
        } else {
          // 기존 시간 슬롯이면 고가/저가 업데이트
          acc[existingIndex] = {
            ...acc[existingIndex],
            high: Math.max(acc[existingIndex].high, candle.high_price),
            low: Math.min(acc[existingIndex].low, candle.low_price),
            close: candle.trade_price
          };
        }

        return acc;
      },
      []
    );

    // 마지막 캔들의 시간 저장
    if (formattedData.length > 0) {
      const lastTime = formattedData[formattedData.length - 1].time;
      if (typeof lastTime === 'number') {
        setLastCandleTime(lastTime);
      }
    }

    seriesRef.current.setData(formattedData);
    chartRef.current?.timeScale().fitContent();
  }, [historicalData]);

  // 시간 포맷터 설정
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.applyOptions({
        localization: {
          timeFormatter: (time: number) => {
            const date = new Date(time * 1000);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}`;
          }
        }
      });
    }
  }, []);

  return (
    <div className={styles.chartContainer}>
      {calChangedPrice && (
        <div>
          <div>비트코인 {marketCode}</div>
          <div>{calChangedPrice.currentPrice.toLocaleString()}원</div>
          <div>${(calChangedPrice.currentPrice / 1420).toFixed(2)}</div>
          <div>{calChangedPrice.priceDifference.toLocaleString()}원</div>
          <div>{calChangedPrice.percentageChange}</div>
          <div>{calChangedPrice.increased ? '상승' : '하락'}</div>
        </div>
      )}
      <div
        ref={chartContainerRef}
        className={styles.chart}
      />
    </div>
  );
}
