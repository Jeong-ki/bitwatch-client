import '@css/style.scss';
import { AppProvider } from '@/provider/app-provider';
import { Metadata } from 'next';
import { MainLayout } from '@/components/layout/main-layout';

const TITLE = '워치비트';
const DESCRIPTION = '가상화폐 시세 조회/알림';
const IMAGE_URL = '/vercel.svg';
const FAVICON_URL = '/vercel.svg';
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
        url: IMAGE_URL,
      },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <AppProvider>
          <MainLayout>{children}</MainLayout>
        </AppProvider>
      </body>
    </html>
  );
}
