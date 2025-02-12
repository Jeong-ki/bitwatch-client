'use client';

import { create } from 'react-modal-promise';
import { Fragment, useEffect, useRef } from 'react';
import { Button } from '@/components/common/button';
import cn from 'classnames';
import { ModalProps } from './types';

const Modal = ({
  title,
  description,
  hasCancelBtn = true,
  cancelText,
  confirmText,
  onResolve,
}: ModalProps) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const onConfirm = () => onResolve({ isConfirm: true });
  const onCancel = () => onResolve({ isConfirm: false });

  useEffect(() => {
    if (!btnRef.current) return;
    setTimeout(() => {
      btnRef.current?.focus?.();
    }, 100);
  }, [btnRef]);

  return (
    <div
      className="comm_layer alert_layer">
      <div className="inner_layer">
        <div className="layer_body">
          <p className="desc_layer">
            {title}
            {description && (
              <span className="txt_sub" style={{ whiteSpace: 'break-spaces' }}>
                {description.includes('<br/>')
                  ? description.split('<br/>').map((text, index) => (
                      <Fragment key={index}>
                        {text}
                        <br />
                      </Fragment>
                    ))
                  : description}
              </span>
            )}
          </p>
        </div>

        <div className="layer_foot">
          {hasCancelBtn && (
            <Button color="secondary" onClick={onCancel}>
              {cancelText || '취소'}
            </Button>
          )}
          <Button
            btnRef={btnRef}
            color="primary"
            onClick={onConfirm}
            className={cn({ btn_single: !hasCancelBtn })}>
            {confirmText || '확인'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export const Alert = create(Modal, {});
