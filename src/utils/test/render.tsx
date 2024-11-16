// render.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { ReactElement } from 'react';
import { NextRouter } from 'next/router';

type CustomRenderOptions = {
  router?: Partial<NextRouter>;
} & Omit<RenderOptions, 'queries'>;

export default async (component: ReactElement, options?: CustomRenderOptions) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries for tests
        staleTime: 0, // 항상 네트워크 요청을 강제
      },
    },
  });

  const user = userEvent.setup();

  return {
    user,
    ...render(<QueryClientProvider client={queryClient}>{component}</QueryClientProvider>, options),
  };
};
