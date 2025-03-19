import '@css/style.scss';
import { AppProvider } from '@/app/provider';
import { Metadata } from 'next';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/react-query';

const TITLE = '비트워치(BitWatch)';
const DESCRIPTION = '가상화폐 시세 조회/알림';
const IMAGE_URL = '/assets/images/favicon.png';
const FAVICON_URL = '/assets/images/favicon.png';
const KEYWORDS = ['가상화폐', '시세', '알림'];

const { NEXT_PUBLIC_URL = '' } = process.env;

export const metadata: Metadata = {
  title: TITLE,
  metadataBase: new URL(NEXT_PUBLIC_URL),
  description: DESCRIPTION,
  keywords: KEYWORDS,
  icons: { icon: { url: FAVICON_URL } },
  openGraph: {
    type: 'website',
    url: NEXT_PUBLIC_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: TITLE,
    images: [
      {
        url: IMAGE_URL
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const queryClient = getQueryClient();

  // await queryClient.prefetchQuery(getUserQueryOptions());

  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="ko">
      <body>
        <AppProvider>
          <HydrationBoundary state={dehydratedState}>
            {children}
          </HydrationBoundary>
        </AppProvider>
      </body>
    </html>
  );
}
