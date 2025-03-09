import { BottomMenu } from '../bottom-menu';
import { Footer } from '../footer';
import { Header } from '../header';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container-doc">
      <Header />
      <main className="doc-main">
        <div className="main-content">{children}</div>
      </main>
      <Footer />
      <BottomMenu />
    </div>
  );
};
