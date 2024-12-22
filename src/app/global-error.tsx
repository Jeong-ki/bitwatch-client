'use client';

import '@css/style.scss';
import { ErrorPage } from '@/components/layout/error';
import { Viewport } from 'next';
import { useEffect } from 'react';

export const viewport: Viewport = {
  initialScale: 0.1,
};

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ko">
      <body>
        <ErrorPage />;
      </body>
    </html>
  );
}
