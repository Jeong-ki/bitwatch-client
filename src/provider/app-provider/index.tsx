'use client';

import { Spinner } from '@/components/common/spinner';
import { ModalContainer } from '@/components/layout/modal-container';
import { getQueryClient } from '@/lib/react-query';
import useGlobalStore from '@/store/global';
import { QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';

export const AppProvider = ({
  children
}: Readonly<{ children: React.ReactNode }>) => {
  const queryClient = getQueryClient();
  const { isLoading } = useGlobalStore();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {isLoading && <Spinner />}
      <Suspense fallback={<Spinner />}>
        <ModalContainer />
      </Suspense>
    </QueryClientProvider>
  );
};
