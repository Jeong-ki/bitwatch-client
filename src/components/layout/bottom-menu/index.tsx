'use client';

import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BottomMenuList = [
  {
    name: '홈',
    icoNm: 'home',
    url: '/'
  },
  {
    name: '채팅',
    icoNm: 'chat',
    url: '/chat'
  },
  {
    name: '커뮤니티',
    icoNm: 'cloud',
    url: '/community'
  },
  {
    name: '마이',
    icoNm: 'user',
    url: '/mypage'
  }
] as const;

export const BottomMenu = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav className="bottom-menu">
      <ul>
        {BottomMenuList.map(menu => {
          const isActive =
            pathname === menu.url || pathname.startsWith(menu.url + '/');

          return (
            <li key={menu.name}>
              <Link href={menu.url}>
                <span
                  className={cn(
                    'ico_comm',
                    isActive ? `ico_${menu.icoNm}_fill` : `ico_${menu.icoNm}`
                  )}
                />
                <p className={cn({ active_tab: isActive })}>{menu.name}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
