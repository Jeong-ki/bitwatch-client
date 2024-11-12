'use client';

import Spinner from '@/components/common/spinner';
import { getQueryClient } from '@/lib/react-query';
import useGlobalStore from '@/store/global';
import { QueryClientProvider } from '@tanstack/react-query';

export default function AppProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const queryClient = getQueryClient();
  const { isLoading } = useGlobalStore();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {isLoading && <Spinner />}
    </QueryClientProvider>
  );
}
