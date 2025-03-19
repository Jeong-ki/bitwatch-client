'use client';

import {
  FC,
  PropsWithChildren,
  useMemo,
  useState,
  FocusEvent,
  useRef
} from 'react';
import { Input } from '@/components/common/input';
import { InputSearchProps } from '@/components/common/input/search/types';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { InputValue } from '@/types/element';

export const InputSearch: FC<PropsWithChildren<InputSearchProps>> = ({
  children,
  value,
  setValue,
  onFocus = () => {},
  onChange = () => {},
  libProps,
  ...otherProps
}) => {
  const localRef = useRef<HTMLDivElement>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const isShowResetBtn = useMemo(
    () => isFocus && !!value && !otherProps.disabled && !otherProps.readOnly,
    [value, isFocus, otherProps.disabled, otherProps.readOnly]
  );

  const setMatchedValue = (value: InputSearchProps['value']) => {
    if (setValue) {
      setValue(libProps?.name ?? '', value, { shouldValidate: true });
    }

    onChange?.(value ?? '');
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
    setIsFocus(true);
    onFocus(e);
  };

  const handleClose = () => {
    setIsFocus(false);
  };

  const onChangeInput = (value: InputValue) => {
    onChange?.(String(value));
  };

  const onClickDeleteBtn = () => {
    setMatchedValue('');
  };

  useOnClickOutside(localRef, handleClose);

  return (
    <Input
      refProp={otherProps?.refProp ?? localRef}
      value={value}
      onChange={onChangeInput}
      onFocus={handleFocus}
      libProps={libProps}
      className="tf_search"
      {...otherProps}>
      {children}
      {isShowResetBtn && (
        <button
          type="button"
          className="btn_g btn_del"
          onClick={onClickDeleteBtn}>
          <span className="ico_comm ico_delete">삭제</span>
        </button>
      )}
      <div className="btn_g search_icon">
        <span className="ico_comm ico_search">검색</span>
      </div>
    </Input>
  );
};
