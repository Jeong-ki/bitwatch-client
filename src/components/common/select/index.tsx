import { useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useOnClickOutside } from '@/hooks/useOutsideClick';
import cn from 'classnames';
import { OptionItem } from '@/@types/element';
import { ISelectProps } from './types';
import { OptionList } from '../option-list';

export const Select = ({
  formSize,
  placeholder = '선택해 주세요.',
  suggestList = [],
  errorMsg,
  value,
  disabled,
  readOnly,
  onChange = () => {},
  libProps = {},
}: ISelectProps) => {
  const { onChange: onChangeLib = () => {}, ref: libRef = () => {}, ...otherLibProps } = libProps;
  const [isFocused, setIsFocused] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);
  const inputHiddenRef = useRef<HTMLInputElement | null>(null);

  const selectedOption = useMemo(
    () => suggestList.find((suggest) => suggest?.value === value),
    [value, suggestList],
  );

  const compareValue = (value: OptionItem['value'] | undefined, item: OptionItem) => {
    return value === item.value;
  };

  const handleFocus = () => {
    if (disabled) return;

    setIsFocused((val) => !val);
  };

  const handleClose = () => {
    setIsFocused(false);
  };

  const handleClickItem = (item: OptionItem) => {
    if (inputHiddenRef && inputHiddenRef.current) {
      inputHiddenRef.current.value = String(item?.value);
    }
    onChange(item?.value, item);
    onChangeLib({ type: 'input', target: inputHiddenRef.current });
    handleClose();
  };

  useOnClickOutside(selectRef, handleClose);

  useImperativeHandle(libRef, () => inputHiddenRef.current);

  return (
    <div ref={selectRef} className={cn('item_form', { [`form_${formSize}`]: formSize })}>
      <div className={cn('opt_comm', { opt_on: value, opt_open: isFocused })}>
        <button
          type="button"
          className={cn('link_selected', 'opt_select', {
            disabled,
            readonly: readOnly,
            error: errorMsg,
          })}
          onClick={handleFocus}>
          <span className="ico_comm ico_arr_d">선택됨</span>
          {selectedOption?.text || placeholder}
        </button>
        <OptionList
          value={value}
          isOpened={isFocused}
          items={suggestList}
          compareValue={compareValue}
          onClick={handleClickItem}
          handleClose={handleClose}
        />
        <input type="hidden" ref={inputHiddenRef} onChange={onChangeLib} {...otherLibProps} />
      </div>
    </div>
  );
};
