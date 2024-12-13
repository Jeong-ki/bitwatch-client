'use client';

import {
  FC,
  FocusEvent,
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { InputSearch } from '@/components/common/input/search';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { OptionItem } from '@/@types/element';
import { getDummy } from '@/api/dummy';
import { OptionList } from '@/components/common/option-list';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
// import { Alert } from '@/components/common/alert';
import { IInputSearchResultProps } from './types';

export const InputSearchResult: FC<PropsWithChildren<IInputSearchResultProps>> = (props) => {
  const {
    value,
    suggestType = 'KKO',
    isExactMatchValue = false,
    isStrictCheck = true,
    isAllowClickOutside = true,
    onSelectExactValue = () => {},
    onFocus = () => {},
    onBlur = () => {},
    onChange = () => {},
    setValue,
    itemClassName,
    libProps = {},
    ...otherProps
  } = props;
  const { onChange: onChangeLib = () => {}, ref: libRef = () => {}, ...otherLibProps } = libProps;
  const searchRef = useRef<HTMLDivElement | null>(null);
  const inputHiddenRef = useRef<HTMLInputElement | null>(null);
  const [isTopPosition, setIsTopPosition] = useState<boolean>(true);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isOpenOption, setIsOpenOption] = useState<boolean>(false);
  const [items, setItems] = useState([]);

  const FETCH_INFO: {
    [key: string]: {
      queryKey: string;
      resultKey: string;
      compareKey: keyof OptionItem;
      subCompareKey?: string;
      params?: Record<string, any>;
      fetchMethod: (params: any) => Promise<any>;
    };
  } = {
    test1: {
      queryKey: 'test1',
      resultKey: 'testList',
      compareKey: 'text',
      fetchMethod: getDummy,
    },
    test2: {
      queryKey: 'test1',
      resultKey: 'testList',
      compareKey: 'text',
      fetchMethod: getDummy,
    },
  };

  const matchedFetchInfo = useMemo(() => FETCH_INFO[suggestType], [suggestType, FETCH_INFO]);

  const hasOptionItems = useMemo(() => items.length !== 0, [items]);

  const suggestItems = useMemo(() => {
    if (['test1', 'test2'].includes(suggestType)) {
      return (items as any[]).map((item) => ({
        text: item.text,
        value: item.value,
        data: item,
      }));
    }
    return [];
  }, [suggestType, items]);

  const initState = () => {
    setItems([]);
    onClose();
  };

  const { refetch: fetchSuggestList } = useQuery({
    queryKey: ['suggest', suggestType, value, matchedFetchInfo?.params],
    queryFn: async () =>
      matchedFetchInfo.fetchMethod({
        ...(matchedFetchInfo?.params ?? {}),
        [matchedFetchInfo.queryKey]: String(value),
      } as any),
    enabled: false,
    gcTime: 10000,
  });

  const compareValue = (value: OptionItem['value'] | undefined, item: OptionItem) =>
    value === item?.text;

  const fetch = async () => {
    try {
      if (!value) {
        initState();
        return;
      }

      const { data: { result: matchedResult } = {} } = await fetchSuggestList();
      setItems((matchedResult as any)?.[matchedFetchInfo.resultKey] ?? []);
    } catch (error) {
      if (error instanceof Error) {
        // Alert({ description: error.message, hasCancelBtn: false });
        console.error(error);
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, [value]);

  const handleChange = (value: OptionItem['value']) => {
    onChange(value);
    if (isExactMatchValue) {
      onChangeLib({ type: 'input', target: inputHiddenRef.current });
    }
    setIsFocus(true);
    setIsOpenOption(true);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
    setIsFocus(true);
    setIsOpenOption(true);
    checkScrollIsTopPosition(isFocus);
    onFocus(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    setIsFocus(false);
    onBlur(e);
  };

  const onClose = () => {
    setIsOpenOption(false);
  };

  const onOutsideClick = () => {
    if (!isFocus) {
      return;
    }

    if (isAllowClickOutside) {
      checkExactMatchValue(true);
    }
    onClose();
  };

  useOnClickOutside(searchRef, onOutsideClick);

  const setMatchedValue = (item?: OptionItem) => {
    if (setValue) {
      setValue(
        props?.libProps?.name ?? '',
        isExactMatchValue ? item?.value : (item?.textValue ?? item?.text),
        {
          shouldValidate: true,
        },
      );
    }

    props?.onChange?.(item?.textValue ?? item?.text ?? '');
  };

  const onKeyPress = (e: any) => {
    const { key } = e;
    if (key === 'Enter') {
      e.preventDefault();
      checkExactMatchValue(false);
    }
  };

  const checkExactMatchValue = (isStrict: boolean) => {
    if (!isExactMatchValue) {
      return;
    }

    const exactMatchValue = suggestItems.find((suggestItem) => {
      return compareValue(value, suggestItem);
    });

    if (!exactMatchValue) {
      if (isStrictCheck && isStrict) {
        setMatchedValue();
      }
      return;
    }

    onClickOptionItem(exactMatchValue);
  };

  const onClickOptionItem = (itemData: OptionItem) => {
    setMatchedValue(itemData);

    if (isExactMatchValue) {
      onSelectExactValue(itemData);
    }

    onClose();
  };

  const checkScrollIsTopPosition = (isFocus: boolean) => {
    if (isFocus) {
      return;
    }
    const inputElem = searchRef.current;
    const wrapperElem = inputElem?.closest?.('.box_tbl.type_scroll') as HTMLElement;

    if (!inputElem || !wrapperElem) {
      return;
    }

    const inputElemClientHeight = inputElem?.clientHeight;
    const inputElemOffsetTop = inputElem?.offsetTop;
    const wrapperElemClientHeight = wrapperElem?.clientHeight;
    const wrapperElemScrollTop = wrapperElem?.scrollTop;
    const wrapperElemOffsetTop = wrapperElem?.offsetTop;
    const inputElemPositionTop = inputElemOffsetTop - wrapperElemOffsetTop;
    const boxOptionElem: HTMLElement | null = inputElem.querySelector('.box_opt');
    if (!boxOptionElem) {
      return;
    }

    boxOptionElem.style.display = 'block';
    const optionListHeight = boxOptionElem?.clientHeight;
    boxOptionElem.style.display = '';

    const isValidPosition =
      wrapperElemClientHeight +
        wrapperElemScrollTop -
        (inputElemPositionTop + optionListHeight + inputElemClientHeight) >
      0;
    setIsTopPosition(isValidPosition);
  };

  useImperativeHandle(libRef, () => inputHiddenRef.current);

  return (
    <InputSearch
      itemClassName={classNames(
        { opt_open: isOpenOption && hasOptionItems, opt_reverse: !isTopPosition },
        itemClassName,
        'type_inpsearch',
      )}
      value={value}
      refProp={searchRef}
      itemChildren={
        <OptionList
          value={value}
          items={suggestItems}
          compareKey={matchedFetchInfo.compareKey}
          subCompareKey={matchedFetchInfo.subCompareKey ?? ''}
          compareValue={compareValue}
          onClick={onClickOptionItem}
          onEnter={onKeyPress}
          isOpened={isOpenOption && hasOptionItems}
          handleClose={onClose}
        />
      }
      onKeyPress={onKeyPress}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      setValue={setValue}
      libProps={isExactMatchValue ? {} : libProps}
      {...otherProps}>
      <input
        className="test"
        type="hidden"
        {...(isExactMatchValue
          ? { ref: inputHiddenRef, onChange: onChangeLib, ...otherLibProps }
          : {})}
      />
    </InputSearch>
  );
};
