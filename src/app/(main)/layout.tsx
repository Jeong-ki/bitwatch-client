import '@css/style.scss';
import { MainLayout } from '@/components/layout/main-layout';
import { Sidebar } from '@/components/layout/sidebar';

export default function AuthLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <MainLayout>{children}</MainLayout>
      <Sidebar />
    </>
  );
}
