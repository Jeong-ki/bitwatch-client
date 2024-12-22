'use client';

import { PropsWithChildren } from 'react';
import { InputProps } from '@/components/common/input/types';
import classNames from 'classnames';
import { InputElem } from './elem';

export const Input = ({
  children,
  refProp,
  sizeType,
  inputSizeType,
  showErrorMsg = false,
  errorMsg,
  showSuccessMsg = false,
  successMsg,
  itemClassName,
  boxChildren,
  itemChildren,
  ...otherProps
}: PropsWithChildren<InputProps>) => {
  return (
    <div
      ref={refProp}
      className={classNames('item_form', { [`form_${sizeType}`]: sizeType }, itemClassName)}>
      <div className="box_tf">
        <div className="inner_tf">
          <InputElem
            errorMsg={errorMsg}
            showSuccessMsg={showSuccessMsg}
            inputSizeType={inputSizeType}
            {...otherProps}
          />
          {children}
        </div>
        {boxChildren}
      </div>
      {itemChildren}
      {errorMsg && showErrorMsg && <p className="desc_error">{errorMsg}</p>}
      {successMsg && showSuccessMsg && <p className="desc_success">{successMsg}</p>}
    </div>
  );
};
