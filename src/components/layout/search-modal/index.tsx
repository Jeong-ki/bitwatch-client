'use client';

import { InputSearch } from '@/components/common/input/search';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useCallback, useEffect, useRef, useState } from 'react';
import { create, InstanceProps } from 'react-modal-promise';
import FocusLock from 'react-focus-lock';
import { useMarketListQuery, useTickerQuery } from '@/domains/crypto/queries';
import { addComma } from '@/utils/common';

interface IResponse {
  isConfirm: boolean;
}

export type ModalProps = InstanceProps<IResponse, IResponse>;

const Modal = ({ isOpen, onResolve }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      const inputEl = node.querySelector('input');
      if (inputEl) {
        inputEl.focus();
      }
    }
  }, []);
  const [keyword, setKeyword] = useState('');
  // const onConfirm = () => onResolve({ isConfirm: true });
  const onCancel = () => onResolve({ isConfirm: false });

  const handleSearch = (value: string) => {
    setKeyword(value);
  };
  const {
    data: marketList = []
    // isLoading: marketLoading,
    // error: marketError
  } = useMarketListQuery();

  const filteredMarkets = marketList.filter(m => {
    const lowerKeyword = keyword.toLowerCase();
    return (
      m.korean_name.includes(keyword) ||
      m.english_name.toLocaleLowerCase().includes(lowerKeyword)
    );
  });
  const marketCodes = filteredMarkets.map(m => m.market);

  const {
    data: tickerData = []
    // isLoading: tickerLoading,
    // error: tickerError
  } = useTickerQuery(marketCodes);

  const mergedData = filteredMarkets.map(m => {
    const ticker = tickerData.find(t => t.market === m.market);
    return {
      ...m,
      trade_price: ticker?.trade_price ?? 0,
      signed_change_rate: ticker?.signed_change_rate ?? 0
    };
  });

  useOnClickOutside(modalRef, onCancel);

  useEffect(() => {
    if (!isOpen) return () => {};

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

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
            <ul className="list_search">
              {mergedData && mergedData.length > 0 ? (
                mergedData.map((item, index) => {
                  const upDownClass =
                    Number(item.signed_change_rate) >= 0 ? 'up' : 'down';
                  return (
                    <li key={index}>
                      <button>
                        <div>
                          <span>별</span>
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
                      </button>
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
