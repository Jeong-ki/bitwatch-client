'use client';

import { PropsWithChildren, useId } from 'react';
import { CheckboxElem } from '@/components/common/checkbox/elem';
import { ICheckboxProps } from '@/components/common/checkbox/types';

export const Checkbox = ({
  text = '',
  description = '',
  type = 'checkbox',
  ...otherProps
}: PropsWithChildren<ICheckboxProps>) => {
  const uniqueId = useId();

  return (
    <div className="checkbox_wrap">
      <CheckboxElem
        type={type}
        id={`checkbox_${uniqueId}`}
        className="checkbox_comm"
        name={`checkbox_${uniqueId}`}
        {...otherProps}
      />
      <span className="checkbox_label_wrap">
        <label htmlFor={`checkbox_${uniqueId}`} className="checkbox_label">
          {text && text}
        </label>
        {description && <span className="checkbox_caption">{description}</span>}
      </span>
    </div>
  );
};
