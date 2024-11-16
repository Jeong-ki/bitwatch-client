import '@testing-library/jest-dom';
import 'whatwg-fetch';
import dotenv from 'dotenv';

import { setupServer } from 'msw/node';
import { handlers } from '@/__mocks__/handlers';
import { NextRouter } from 'next/router';

dotenv.config({ path: '.env.test' });

/* msw */
export const server = setupServer(...handlers);

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'warn' });
});

afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});

afterAll(() => {
  jest.resetAllMocks();
  server.close();
});

jest.mock('zustand');

const defaultRouter: Partial<NextRouter> = {
  pathname: '/', // 기본 경로 설정
  route: '/',
  query: {},
  asPath: '/',
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(undefined),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  basePath: '',
  isReady: true,
  isLocaleDomain: false,
  isPreview: false,
};

// `useRouter`를 함수로 명시적으로 모킹
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ ...defaultRouter })),
}));

// window.matchMedia mocking
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
