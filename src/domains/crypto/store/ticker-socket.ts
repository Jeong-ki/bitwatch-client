import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export type MarketCode = string; // 'KRW-BTC', 'KRW-ETH' 등

export type UpbitChangeType = 'RISE' | 'EVEN' | 'FALL';
export type UpbitAskBidType = 'ASK' | 'BID';
export type UpbitMarketState = 'ACTIVE' | 'PREVIEW' | 'DELISTED' | 'CAUTION';
export type UpbitMarketWarning = 'NONE' | 'CAUTION';
export type UpbitStreamType = 'SNAPSHOT' | 'REALTIME';

export interface UpbitTickerResponse {
  type: string;
  code: MarketCode;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  prev_closing_price: number;
  acc_trade_price: number;
  change: UpbitChangeType;
  change_price: number;
  signed_change_price: number;
  change_rate: number;
  signed_change_rate: number;
  ask_bid: UpbitAskBidType;
  trade_volume: number;
  acc_trade_volume: number;
  trade_date: string;
  trade_time: string;
  trade_timestamp: number;
  acc_ask_volume: number;
  acc_bid_volume: number;
  highest_52_week_price: number;
  highest_52_week_date: string;
  lowest_52_week_price: number;
  lowest_52_week_date: string;
  market_state: UpbitMarketState;
  is_trading_suspended: boolean;
  delisting_date: string | null;
  market_warning: UpbitMarketWarning;
  timestamp: number;
  acc_trade_price_24h: number;
  acc_trade_volume_24h: number;
  stream_type: UpbitStreamType;
}

export interface UpbitErrorResponse {
  error: {
    name:
      | 'INVALID_AUTH'
      | 'WRONG_FORMAT'
      | 'NO_TICKET'
      | 'NO_TYPE'
      | 'NO_CODES'
      | 'INVALID_PARAM';
    message: string;
  };
}

export interface TickerSocketState {
  socket: WebSocket | null;
  connected: boolean;
  data: Record<MarketCode, UpbitTickerResponse>;
  lastMessage: UpbitTickerResponse | null;
  error: string | null;
  reconnectAttempts: number;
  lastSubscribedMarkets: MarketCode[];
  connect: (markets: MarketCode[]) => void;
  disconnect: () => void;
}

const PING_INTERVAL = 55000; // 55초마다 핑 전송 (서버 타임아웃 120초)
const RECONNECT_INTERVAL = 5000; // 5초 후 재연결 시도
const MAX_RECONNECT_ATTEMPTS = 10; // 최대 재연결 시도 횟수

const store: StateCreator<TickerSocketState> = (set, get) => {
  let pingInterval: NodeJS.Timeout | null = null;
  let reconnectTimeout: NodeJS.Timeout | null = null;

  const cleanup = () => {
    if (pingInterval) {
      clearInterval(pingInterval);
      pingInterval = null;
    }

    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
      reconnectTimeout = null;
    }
  };

  return {
    socket: null,
    connected: false,
    data: {},
    lastMessage: null,
    error: null,
    reconnectAttempts: 0,
    lastSubscribedMarkets: [],

    connect: (markets: MarketCode[]) => {
      // 이미 연결된 경우 끊기
      const { socket } = get();
      if (socket) {
        socket.close();
      }

      // 자원 정리
      cleanup();

      // 마지막 구독 마켓 저장
      set({ lastSubscribedMarkets: [...markets] });

      try {
        // 웹소켓 연결
        const newSocket = new WebSocket('wss://api.upbit.com/websocket/v1');

        newSocket.onopen = () => {
          console.log('업비트 웹소켓 연결됨');
          set({
            connected: true,
            error: null,
            socket: newSocket,
            reconnectAttempts: 0
          });

          // 구독 요청 전송
          const request = [
            { ticket: `UNIQUE_TICKET_${new Date().getTime()}` },
            {
              type: 'ticker',
              codes: markets
            },
            { format: 'DEFAULT' }
          ];

          newSocket.send(JSON.stringify(request));

          // 핑 인터벌 설정
          pingInterval = setInterval(() => {
            if (newSocket.readyState === WebSocket.OPEN) {
              newSocket.send('PING');
            }
          }, PING_INTERVAL);
        };

        newSocket.onmessage = event => {
          // 메시지를 받아서 처리
          try {
            // 핑 응답 확인
            if (typeof event.data === 'string' && event.data.includes('pong')) {
              console.log('PONG 응답 수신');
              return;
            }

            const reader = new FileReader();
            reader.onload = () => {
              try {
                if (!reader.result) return;

                const response = JSON.parse(reader.result as string);

                // 에러 메시지 확인
                if ('error' in response) {
                  console.error('WebSocket Error:', response);
                  set({ error: JSON.stringify(response) });
                  return;
                }

                // 정상적인 데이터 처리
                const tickerResponse = response as UpbitTickerResponse;
                if (tickerResponse.code) {
                  set(state => ({
                    lastMessage: tickerResponse,
                    data: {
                      ...state.data,
                      [tickerResponse.code]: tickerResponse
                    }
                  }));
                }
              } catch (err) {
                console.error('WebSocket 메시지 파싱 오류:', err);
              }
            };

            reader.readAsText(event.data);
          } catch (err) {
            console.error('WebSocket 데이터 읽기 오류:', err);
          }
        };

        newSocket.onerror = event => {
          console.error('WebSocket 오류:', event);
          set({ error: '웹소켓 연결 오류가 발생했습니다.' });
        };

        newSocket.onclose = event => {
          console.log(`웹소켓 연결 종료: ${event.code} ${event.reason}`);
          set(() => ({ connected: false, socket: null }));

          // 핑 인터벌 정리
          if (pingInterval) {
            clearInterval(pingInterval);
            pingInterval = null;
          }

          // 자동 재연결 시도
          const { reconnectAttempts, lastSubscribedMarkets } = get();
          if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
            const nextAttempt = reconnectAttempts + 1;
            set({ reconnectAttempts: nextAttempt });

            console.log(
              `재연결 시도 ${nextAttempt}/${MAX_RECONNECT_ATTEMPTS}...`
            );

            reconnectTimeout = setTimeout(() => {
              get().connect(lastSubscribedMarkets);
            }, RECONNECT_INTERVAL);
          } else {
            set({ error: '최대 재연결 시도 횟수 초과' });
          }
        };
      } catch (err) {
        console.error('웹소켓 생성 오류:', err);
        set({ error: '웹소켓 인스턴스 생성 실패' });
      }
    },
    disconnect: () => {
      const { socket } = get();
      if (socket) {
        socket.close();
      }

      cleanup();
      set({
        socket: null,
        connected: false,
        reconnectAttempts: 0
      });
    }
  };
};

const useTickerSocket = create<TickerSocketState>()(
  devtools(store, { enabled: process.env.NODE_ENV === 'development' })
);

export default useTickerSocket;
