import { isEmptyNum } from '@/utils/common';
import Link from 'next/link';
import { HTTP_STATUS } from '@/@types/enum';
import { Footer } from '../footer';

export const ErrorPage = ({ status }: { status?: number }) => {
  return (
    <div className="container-doc type_empty">
      <hr className="hide" />
      <main className="doc-main cont_error">
        <section className="inner-main">
          <div className="main-content">
            <article
              id="mainContent"
              className="content-article">
              <div className="wrap_error">
                {!isEmptyNum(status) && (
                  <strong className="tit_error">{status} 에러</strong>
                )}
                <div className="area_error_ico">
                  <span className="ico_comm ico_wran">삭제</span>
                </div>
                {status === HTTP_STATUS.NOT_FOUND ? (
                  <>
                    <h1 className="tit_error_txt">
                      시스템 이용에 불편을 드려 죄송합니다.
                    </h1>
                    <div className="area_error_txt">
                      찾으시려는 페이지의 주소가 잘못 입력되었거나, 페이지
                      주소의 변경 혹은 삭제로 인해 현재 사용하실 수 없습니다.
                      <br />
                      입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주시길
                      부탁드립니다.
                    </div>
                  </>
                ) : status === HTTP_STATUS.INTERNAL_SERVER_ERROR ? (
                  <>
                    <h1 className="tit_error_txt">
                      시스템 이용에 불편을 드려 죄송합니다.
                    </h1>
                    <div className="area_error_txt">
                      연결하려는 페이지는 접근이 불가능한 경로입니다.
                      <br />
                      접근 경로를 다시 확인해 주시길 부탁드립니다.
                    </div>
                  </>
                ) : (
                  <h1 className="tit_error_txt">
                    사이트 접속이 원할하지 않습니다.
                    <br />
                    잠시 후 다시 시도해주세요.
                  </h1>
                )}
                <div className="box_btn">
                  <Link href="/">
                    홈 화면으로 이동 <span className="ico_comm ico_link" />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
