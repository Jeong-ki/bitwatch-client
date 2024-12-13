'use client';

import { ChangeEvent } from 'react';
import { ITextAreaElemProps } from '@/components/common/textarea/elem/types';

export const TextareaElem = ({
  onChange = () => {},
  libProps = {},
  placeholder,
  ...otherProps
}: ITextAreaElemProps) => {
  const { onChange: onChangeLib = () => {}, ...otherLibProps } = libProps;

  const onChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value: targetValue },
    } = e;

    if (typeof otherProps.maxLength === 'number' && otherProps?.maxLength < targetValue.length) {
      return;
    }

    onChange(targetValue);
    onChangeLib(e);
  };

  return (
    <textarea
      className="tf_comm"
      placeholder={placeholder ?? '입력해 주세요.'}
      {...otherProps}
      {...otherLibProps}
      onChange={onChangeInput}
    />
  );
};
