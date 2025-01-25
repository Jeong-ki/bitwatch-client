import { Footer } from '@/components/layout/footer';

export default function UnAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-doc type_empty">
      <main className="doc-main cont_login">
        <section className="inner-main">
          <div className="main-content">
            <article id="mainContent" className="content-article">
              {children}
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
