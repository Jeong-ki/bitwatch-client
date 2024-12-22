'use client';

import { PropsWithChildren } from 'react';
import { TextareaProps } from '@/components/common/textarea/types';
import classNames from 'classnames';
import { TextareaElem } from '@/components/common/textarea/elem';

export const Textarea = ({
  children,
  sizeType,
  showErrorMsg = false,
  errorMsg,
  readOnly,
  disabled,
  value,
  maxLength,
  isAbleResize,
  itemClassName = '',
  ...otherProps
}: PropsWithChildren<TextareaProps>) => {
  return (
    <div className={classNames('item_form', { [`form_${sizeType}`]: sizeType }, itemClassName)}>
      <div
        className={classNames('box_tf', 'box_textarea', {
          readonly: readOnly,
          disabled,
          type_resize: isAbleResize,
          error: errorMsg,
        })}>
        <TextareaElem
          value={value}
          readOnly={readOnly}
          disabled={disabled}
          maxLength={maxLength}
          {...otherProps}
        />
        {children}
        {maxLength && (
          <span className="txt_count">
            <em className="emph_g">{value?.length ?? 0}</em> / {maxLength}
          </span>
        )}
      </div>
      {errorMsg && showErrorMsg && <p className="desc_error">{errorMsg}</p>}
    </div>
  );
};
