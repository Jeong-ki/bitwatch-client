'use client';

import { ChangeEvent, FocusEvent } from 'react';
import { InputElemProps } from '@/components/common/input/elem/types';
import cn from 'classnames';

export const InputElem = ({
  errorMsg,
  showSuccessMsg,
  autoComplete = 'off',
  onBlur = () => {},
  onChange = () => {},
  libProps = {},
  inputSizeType,
  className,
  ...otherProps
}: InputElemProps) => {
  const {
    onBlur: onBlurLib = () => {},
    onChange: onChangeLib = () => {},
    ...otherLibProps
  } = libProps;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: targetValue },
    } = e;

    if (typeof otherProps.maxLength === 'number' && otherProps?.maxLength < targetValue.length) {
      return;
    }
    onChange(targetValue);
    onChangeLib(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    onBlur(e);
    onBlurLib(e);
  };

  return (
    <input
      placeholder=""
      onBlur={handleBlur}
      className={cn('tf_comm', className, inputSizeType && `type_${inputSizeType}`, {
        error: errorMsg,
        success: showSuccessMsg,
      })}
      autoComplete={autoComplete}
      {...otherProps}
      {...otherLibProps}
      onChange={handleChange}
    />
  );
};
