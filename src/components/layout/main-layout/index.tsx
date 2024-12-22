import { Header } from '../header';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container-doc">
      <Header />
      <main className="doc-main">
        <section className="inner-main">
          {/* <Gnb /> */}
          <div className="main-content">
            <article className="content-article">
              <div className="wrap_contents">{children}</div>
            </article>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  );
};
