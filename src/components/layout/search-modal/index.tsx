'use client';

import { InputSearch } from '@/components/common/input/search';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useCallback, useRef } from 'react';
import { create, InstanceProps } from 'react-modal-promise';
import FocusLock from 'react-focus-lock';
import { addComma } from '@/utils/common';
import { useSearchMarkets } from '@/domains/crypto/hooks/useSearchMarkets';
import { useEscapeKey } from '@/hooks/useEscapeKey';

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

  const { keyword, setKeyword, marketsData } = useSearchMarkets();

  const handleSearch = (value: string) => {
    setKeyword(value);
  };

  const onCancel = () => onResolve({ isConfirm: false });

  useOnClickOutside(modalRef, onCancel);
  useEscapeKey(onCancel, isOpen);

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
              {marketsData ? (
                marketsData.map((item, index) => {
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
