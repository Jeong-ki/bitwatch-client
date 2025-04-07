'use client';

import { InputSearch } from '@/components/common/input/search';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useCallback, useEffect, useRef, useState } from 'react';
import { create, InstanceProps } from 'react-modal-promise';
import FocusLock from 'react-focus-lock';
import { addComma } from '@/utils/common';
import { useSearchMarkets } from '@/domains/crypto/hooks/useSearchMarkets';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import cn from 'classnames';
import Link from 'next/link';
import { CurrencyTabs, DummyFavorites } from '../../constants';

interface IResponse {
  isConfirm: boolean;
}

export type ModalProps = InstanceProps<IResponse, IResponse>;

const Modal = ({ isOpen, onResolve }: ModalProps) => {
  // TODO: API 개발 후 기능구현
  const [dummyFavorites, setDummyFavorites] = useState(DummyFavorites);
  const [activeTab, setActiveTab] = useState<(typeof CurrencyTabs)[number]>(
    CurrencyTabs[0]
  );
  const [underBarStyle, setUnderBarStyle] = useState({ left: 0, width: 0 });

  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);

  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      const inputEl = node.querySelector('input');
      if (inputEl) {
        inputEl.focus();
      }
    }
  }, []);

  const { keyword, setKeyword, marketsData } = useSearchMarkets(
    activeTab.currency
  );
  console.log(marketsData);

  const handleSearch = (value: string) => {
    setKeyword(value);
  };

  const handleFavorites = (market: string) => {
    setDummyFavorites(favorites => {
      if (favorites.some(fav => fav.market === market)) {
        return favorites.filter(fav => fav.market !== market);
      }
      return [
        ...favorites,
        { market, korean_name: market, english_name: market }
      ];
    });
  };

  const onCancel = () => onResolve({ isConfirm: false });

  useOnClickOutside(modalRef, onCancel);
  useEscapeKey(onCancel, isOpen);

  useEffect(() => {
    const activeIndex = CurrencyTabs.findIndex(
      tab => tab.currency === activeTab.currency
    );
    const tabEl = tabRefs.current[activeIndex];
    if (tabEl) {
      const parentRect = tabEl.parentElement?.getBoundingClientRect();
      const activeRect = tabEl.getBoundingClientRect();
      if (parentRect) {
        setUnderBarStyle({
          left: activeRect.left - parentRect.left,
          width: activeRect.width
        });
      }
    }
  }, [activeTab]);

  return (
    <div className="comm_layer">
      <FocusLock
        disabled={!isOpen}
        autoFocus={false}>
        <div
          className="inner_layer layer_search"
          ref={modalRef}>
          <div className="layer_body">
            <InputSearch
              refProp={inputRef}
              value={keyword}
              onChange={handleSearch}
            />
            <div className="tab_wrap">
              <div
                className="tab_underbar"
                style={underBarStyle}
              />
              <ul className="list_tab">
                {CurrencyTabs.map((tab, index) => (
                  <li
                    key={tab.currency}
                    ref={el => {
                      tabRefs.current[index] = el;
                    }}
                    className={cn({
                      active: activeTab.currency === tab.currency
                    })}>
                    <button onClick={() => setActiveTab(tab)}>
                      {tab.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <ul className="list_search">
              {marketsData ? (
                marketsData.map((item, index) => {
                  const upDownClass =
                    Number(item.signed_change_rate) >= 0 ? 'up' : 'down';
                  return (
                    <li key={index}>
                      {/* TODO: 상세페이지 이동 적용 필요 */}
                      <Link
                        href="/"
                        className="li_item">
                        <div>
                          <button
                            className="btn_favor"
                            onClick={() => handleFavorites(item.market)}>
                            <span
                              className={cn(
                                'ico_comm',
                                dummyFavorites.some(
                                  fav => fav.market === item.market
                                )
                                  ? 'ico_star_favor_fill'
                                  : 'ico_star_favor'
                              )}
                            />
                          </button>
                          <div>
                            <p>{item.korean_name}</p>
                            <p>{`${item.market.split('-')[1]}/${item.market.split('-')[0]}`}</p>
                          </div>
                        </div>
                        <div>
                          <p>{addComma(item.trade_price)}원</p>
                          <p className={upDownClass}>
                            {(item.signed_change_rate * 100).toFixed(2)}%
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })
              ) : (
                <li className="list_empty">검색된 코인이 없습니다.</li>
              )}
            </ul>
          </div>
        </div>
      </FocusLock>
    </div>
  );
};

export const SearchModal = create(Modal, {});
