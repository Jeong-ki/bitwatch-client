import {
  QueryClient,
  DefaultOptions,
  UseMutationOptions
} from '@tanstack/react-query';

// 전역 옵션 설정 (타입 안전성을 위해 satisfies 사용 가능)
export const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 // 1분
  }
} satisfies DefaultOptions;

// API 함수의 반환 타입 유틸리티
export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> =
  Awaited<ReturnType<FnType>>;

// useQuery에 대한 추가 옵션 타입 정의 (queryKey와 queryFn 제외)
export type QueryConfig<T extends (...args: any) => any> = Omit<
  ReturnType<T>,
  'queryKey' | 'queryFn'
>;

// useMutation에 사용할 타입 정의
export type MutationConfig<
  MutationFnType extends (...args: any) => Promise<any>
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>, // 성공 시 반환 타입
  Error, // 에러 타입
  Parameters<MutationFnType>[0] // mutation 함수의 첫 번째 인자 타입
>;

// QueryClient 생성 함수 (새 QueryClient 객체 생성)
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: queryConfig
  });
}

// 클라이언트에서 한 번만 생성하도록 싱글턴 패턴 적용 (CSR/SSR 분기 처리)
let clientQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (typeof window === 'undefined') {
    // 서버 사이드에서는 항상 새로운 QueryClient를 생성
    return makeQueryClient();
  }
  // 브라우저에서는 기존 객체가 없으면 생성, 있으면 재사용
  if (!clientQueryClient) clientQueryClient = makeQueryClient();
  return clientQueryClient;
}
