'use client';

import { InputSearch } from '@/components/common/input/search';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useCallback, useEffect, useRef } from 'react';
import { create, InstanceProps } from 'react-modal-promise';
import FocusLock from 'react-focus-lock';

interface IResponse {
  isConfirm: boolean;
}

export type ModalProps = InstanceProps<IResponse, IResponse>;

const dummyData = [
  {
    logo: '로고',
    name: '테슬라',
    code: 'TSLA',
    price: '381,399원',
    change: '+0.12'
  },
  {
    logo: '로고',
    name: '애플',
    code: 'AAPL',
    price: '150,000원',
    change: '-0.32'
  },
  {
    logo: '로고',
    name: '구글',
    code: 'GOOGL',
    price: '280,000원',
    change: '+1.05'
  },
  {
    logo: '로고',
    name: '마이크로소프트',
    code: 'MSFT',
    price: '320,500원',
    change: '-2.4'
  },
  {
    logo: '로고',
    name: '아마존',
    code: 'AMZN',
    price: '410,000원',
    change: '+0.78'
  },
  {
    logo: '로고',
    name: '테슬라',
    code: 'TSLA',
    price: '381,399원',
    change: '+0.12'
  },
  {
    logo: '로고',
    name: '애플',
    code: 'AAPL',
    price: '150,000원',
    change: '-0.32'
  },
  {
    logo: '로고',
    name: '구글',
    code: 'GOOGL',
    price: '280,000원',
    change: '+1.05'
  },
  {
    logo: '로고',
    name: '마이크로소프트',
    code: 'MSFT',
    price: '320,500원',
    change: '-2.4'
  },
  {
    logo: '로고',
    name: '아마존',
    code: 'AMZN',
    price: '410,000원',
    change: '+0.78'
  }
];

const Modal = ({ isOpen, onResolve }: ModalProps) => {
  // const onConfirm = () => onResolve({ isConfirm: true });
  const onCancel = () => onResolve({ isConfirm: false });
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      const inputEl = node.querySelector('input');
      if (inputEl) {
        inputEl.focus();
      }
    }
  }, []);

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
            <InputSearch refProp={inputRef} />
            <ul className="list_search">
              {dummyData.map((item, index) => {
                const upDownClass = Number(item.change) >= 0 ? 'up' : 'down';
                return (
                  <li key={index}>
                    <button>
                      <div>
                        <span>{item.logo}</span>
                        <div>
                          <p>{item.name}</p>
                          <p>{item.code}</p>
                        </div>
                      </div>
                      <div>
                        <p>{item.price}</p>
                        <p className={upDownClass}>{item.change}%</p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </FocusLock>
    </div>
  );
};

export const SearchModal = create(Modal, {});
