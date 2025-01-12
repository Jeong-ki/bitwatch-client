'use client';

import { create } from 'react-modal-promise';
import { Fragment } from 'react';
import { Button } from '@/components/common/button';
import { ModalProps } from './types';

const Modal = ({
  title,
  description,
  hasCancelBtn = true,
  cancelText,
  confirmText,
  isOpen,
  onResolve,
}: ModalProps) => {
  const onConfirm = () => onResolve({ isConfirm: true });
  const onCancel = () => onResolve({ isConfirm: false });

  return (
    <div
      className="comm_layer alert_layer"
      style={{ display: isOpen ? undefined : 'none', zIndex: 100000 }}>
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
          <Button color="primary" onClick={onConfirm}>
            {confirmText || '확인'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export const Alert = create(Modal, {});
