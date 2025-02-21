'use client';

import { useRouterChange } from '@/hooks/useRouterChange';
import { useRef } from 'react';
import { Container } from 'react-modal-promise';

export const ModalContainer = () => {
  const ref = useRef<any>(null);
  useRouterChange({
    onRouteChangeStart: () => {
      if (!ref || !ref.current) {
        return;
      }

      ref.current.rejectAll('history back then closed');
    }
  });

  const onOpen = () => {
    document.body.style.overflow = 'hidden';
  };

  const onRemove = () => {
    document.body.style.overflow = '';
  };
  return (
    <Container
      ref={ref}
      onOpen={onOpen}
      onRemove={onRemove}
    />
  );
};
