'use client';

import { ChangeEvent } from 'react';
import { IInputCheckboxElemProps } from '@/components/common/checkbox/elem/types';
import classNames from 'classnames';

export const CheckboxElem = ({
  errorMsg,
  onChange = () => {},
  libProps = {},
  ...otherProps
}: IInputCheckboxElemProps) => {
  const { onChange: onChangeLib = () => {}, ...otherLibProps } = libProps;

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked },
    } = e;

    onChange(checked, otherProps?.value);
    onChangeLib(e);
  };

  return (
    <input
      className={classNames('tf_comm', { error: errorMsg })}
      {...otherProps}
      {...otherLibProps}
      onChange={onChangeInput}
    />
  );
};
