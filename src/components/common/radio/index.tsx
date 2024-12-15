'use client';

import { PropsWithChildren } from 'react';
import { IRadioProps } from '@/components/common/radio/types';
import { RadioElem } from '@/components/common/radio/elem';

export const Radio = ({ value, items = [], ...otherProps }: PropsWithChildren<IRadioProps>) => {
  return (
    <div className="radio_group">
      {items.map((item, index) => {
        return <RadioElem key={index} selected={value} {...item} {...otherProps} />;
      })}
    </div>
  );
};
