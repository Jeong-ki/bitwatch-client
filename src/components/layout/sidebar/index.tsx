'use client';

import { Fragment, useState } from 'react';
import cn from 'classnames';

interface SidebarMenu {
  name: string;
  subName: string;
  icoNm: string;
  isChecked: boolean;
}

const SidebarMenu = [
  {
    name: '내 알람',
    subName: '내 알람',
    icoNm: 'bell',
    isChecked: false,
  },
  {
    name: '관심',
    subName: '관심 코인',
    icoNm: 'star',
    isChecked: false,
  },
  {
    name: '최근 본',
    subName: '최근 본 코인',
    icoNm: 'clock',
    isChecked: false,
  },
  {
    name: '랭킹',
    subName: '코인 랭킹 (알람/관심)',
    icoNm: 'trophy',
    isChecked: false,
  },
];

export const Sidebar = () => {
  const [menuList, setMenuList] = useState<SidebarMenu[]>(SidebarMenu);

  const handleMenuList = (index: number) => () => {
    setMenuList((prevMenuList) =>
      prevMenuList.map((item, idx) => ({
        ...item,
        isChecked: idx === index ? !item.isChecked : false,
      })),
    );
  };

  const currentMenu = menuList.find((menu) => menu.isChecked);

  return (
    <div className={cn('doc-sidebar', { open: currentMenu?.isChecked })}>
      <div className="inner_sidebar">
        <nav className="sidebar_menu">
          {menuList.map((menu, index) => (
            <Fragment key={menu.icoNm}>
              <button
                type="button"
                className={cn({ btn_clicked: menu.isChecked })}
                onClick={handleMenuList(index)}>
                <div className="ico_wrap">
                  <span
                    className={cn('ico_comm', {
                      [`ico_${menu.icoNm}_fill`]: menu.isChecked,
                      [`ico_${menu.icoNm}`]: !menu.isChecked,
                    })}
                  />
                </div>
                {menu.name}
              </button>
              {index === 2 && <hr />}
            </Fragment>
          ))}
        </nav>
      </div>
      <div className="sidebar_sub">
        <div className="inner_sub">
          <div className="sub_tit">
            <p>{currentMenu?.subName}</p>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};
