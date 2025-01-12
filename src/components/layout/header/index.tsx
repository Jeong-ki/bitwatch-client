'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/common/button';
import cn from 'classnames';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import SearchIcon from '@img/icon/search.svg';
import { isTokenValid } from '@/utils/common';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/auth';
import { signoutUser } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';

export const Header = () => {
  const router = useRouter();
  const { accessToken, clearAuth } = useAuthStore();
  const isLoggedIn = !!accessToken && isTokenValid(accessToken);
  const [isOpenProfile, setIsOpenProfile] = useState<boolean>(false);
  const profileRef = useRef(null);

  const { mutate: signout } = useMutation({
    mutationFn: signoutUser,
  });

  const handleOpenProfile = () => {
    setIsOpenProfile((prev) => !prev);
  };

  const handleSignout = () => {
    signout();
    clearAuth();
  };

  useOnClickOutside(profileRef, () => setIsOpenProfile(false));

  return (
    <header className="doc-header">
      <nav>
        <h1 className="doc-title">
          <Link href="/" className="link_logo">
            BitWatch
          </Link>
        </h1>
        <nav className="nav-header">
          <ul>
            <li>
              <Button color="invisible" size="medium">
                <Link href="/">홈</Link>
              </Button>
            </li>
            <li>
              <Button color="invisible" size="medium">
                <Link href="/">채팅</Link>
              </Button>
            </li>
            <li>
              <Button color="invisible" size="medium">
                <Link href="/">커뮤니티</Link>
              </Button>
            </li>
          </ul>
          <Button className="search">
            <Image src={SearchIcon} width={16} height={16} alt="조회 아이콘" />
            <span>/</span> <p>를 눌러 검색해보세요.</p>
          </Button>
        </nav>
        <div>
          {isLoggedIn ? (
            <div ref={profileRef} className="info_my">
              <div className="profile_user">
                <strong className="screen_out">사용자 프로필</strong>
                <button className="link_thumb" type="button" onClick={handleOpenProfile}>
                  <div className="wrap_thumb">
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                      width={35}
                      height={35}
                      alt="사용자 이미지"
                    />
                  </div>
                </button>
              </div>
              <div className={cn('profile_layer', { layer_open: isOpenProfile })}>
                <div className="inner_layer">
                  <div className="layer_body">
                    <div className="info_profile">
                      <strong className="screen_out">로그인 정보</strong>
                      <div className="wrap_thumb">
                        <Image
                          src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                          width={35}
                          height={35}
                          alt="사용자 이미지"
                        />
                      </div>
                      <div className="info_thumb">
                        <strong className="tit_name">유저명</strong>
                        <span className="txt_id">이메일</span>
                      </div>
                    </div>
                  </div>
                  <div className="layer_foot">
                    <button type="button" className="btn_txt" onClick={handleSignout}>
                      로그아웃
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Button color="primary" size="medium" onClick={() => router.push('/signin')}>
              로그인
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};
