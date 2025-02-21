'use client';

import { PropsWithChildren, useId } from 'react';
import { InputElem } from '@/components/common/input/elem';
import { RadioItemProps } from '@/components/common/radio/elem/types';

export const RadioElem = ({
  value,
  text,
  description,
  selected,
  type = 'radio',
  ...otherProps
}: PropsWithChildren<RadioItemProps>) => {
  const uniqueId = useId();

  return (
    <div className="radio_wrap">
      <InputElem
        type={type}
        id={`radio_${uniqueId}`}
        className="radio_comm"
        name={`radio_${uniqueId}`}
        value={value}
        checked={selected === value}
        {...otherProps}
      />
      <div className="radio_label_wrap">
        <label
          htmlFor={`radio_${uniqueId}`}
          className="radio_label">
          {text}
        </label>
        <span className="radio_caption">{description}</span>
      </div>
    </div>
  );
};
