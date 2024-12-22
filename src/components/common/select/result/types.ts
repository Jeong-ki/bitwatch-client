import { SelectProps } from '@/components/common/select/types';

export interface SelectResultProps extends Omit<SelectProps, 'suggestList'> {
  type: 'test1' | 'test2'; // api type
  params?: any; // api request type
  isAll?: boolean;
  prependSuggestList?: SelectProps['suggestList'];
  defaultSelectIndex?: number;
  onChangeSpecialValue?: (bool: boolean) => void;
  refetchKeys?: any[];
  isValidateValue?: boolean;
}
