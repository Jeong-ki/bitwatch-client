import '@testing-library/jest-dom';
import 'whatwg-fetch';
import dotenv from 'dotenv';

import { setupServer } from 'msw/node';
import { handlers } from '@/__mocks__/handlers';

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

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

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
