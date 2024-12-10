'use client';

import { useEffect, useMemo, useState } from 'react';
import { Select } from '@/components/common/select';
import { useQuery } from '@tanstack/react-query';
import { ISelectResult } from '@/components/common/select/result/types';
import isEmpty from 'lodash.isempty';
import { getDummy } from '@/api/dummy';
import { OptionItem } from '@/@types/element';
import { isEmptyNum } from '@/utils/common';

export const SelectResult = ({
  type,
  params = {},
  isAll = false,
  value,
  onChange = () => {},
  defaultSelectIndex,
  onChangeSpecialValue = () => {},
  isValidateValue = true,
  prependSuggestList = [],
  refetchKeys = [],
  ...otherProps
}: ISelectResult) => {
  const [isFetchedAndSetChanged, setIsFetchedAndSetChanged] = useState<boolean>(false);
  const DEFAULT_PARAMS = {
    test1: { id: 'test', useYn: 'Y' },
    test2: { id: 'test', useYn: 'Y' },
  };
  const FETCH_METHODS = {
    test1: getDummy, // getFetchAPI
    test2: getDummy,
  };

  const getConvertSuggestList = (type: ISelectResult['type'], result: unknown, isAll?: boolean) => {
    const convertedList = [];
    if (!result || !type) {
      return [];
    }

    if (isAll) {
      convertedList.push();
    }

    if (type === 'test1') {
      convertedList.push(
        ...(result as any).authorityList.map((item: any) => ({
          text: item?.text,
          value: item?.value,
          data: item,
        })),
      );
    }

    return [...prependSuggestList, ...convertedList];
  };

  const { data: { result } = {}, isFetched } = useQuery({
    queryKey: [
      'select',
      type,
      ...Object.values({ ...DEFAULT_PARAMS[type], ...params }),
      ...refetchKeys,
    ],
    queryFn: async () => FETCH_METHODS[type]({ ...DEFAULT_PARAMS[type], ...params } as any),
    staleTime: 100000,
  });

  const suggestList = useMemo(
    () => getConvertSuggestList(type, result, isAll),
    [type, result, isAll],
  );

  const setMatchedValue = (value: OptionItem['value'], item?: OptionItem) => {
    if (otherProps?.setValue) {
      otherProps?.setValue(otherProps?.libProps?.name ?? '', value);
    }

    if (item?.data?.textYn) {
      onChangeSpecialValue(item?.data?.textYn === 'Y');
    }

    onChange?.(value ?? '', item);
  };

  useEffect(() => {
    if (!isFetched || !isValidateValue) {
      return;
    }

    if (typeof value === 'number' ? isEmptyNum(value) : isEmpty(value)) {
      if (!isEmptyNum(defaultSelectIndex)) {
        const item = suggestList[defaultSelectIndex as number];
        setMatchedValue?.(item?.value, item);
      }
      return;
    }

    if (suggestList.every((item) => item?.value !== value)) {
      setMatchedValue('');
    } else if (!isFetchedAndSetChanged) {
      const findValue = suggestList.find((suggest) => suggest?.value === value);
      if (findValue?.data?.textYn) {
        onChangeSpecialValue(findValue?.data?.textYn === 'Y');
      }
      onChange?.(value ?? '', findValue);
      setIsFetchedAndSetChanged(true);
    }
  }, [isFetched, isValidateValue, value, suggestList]);

  return (
    <Select
      value={value || ''}
      onChange={setMatchedValue}
      suggestList={suggestList}
      {...otherProps}
    />
  );
};
