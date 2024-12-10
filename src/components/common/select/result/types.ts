import { ISelectProps } from '@/components/common/select/types';

export interface ISelectResult extends Omit<ISelectProps, 'suggestList'> {
  type: 'test1' | 'test2'; // api type
  params?: any; // api request type
  isAll?: boolean;
  prependSuggestList?: ISelectProps['suggestList'];
  defaultSelectIndex?: number;
  onChangeSpecialValue?: (bool: boolean) => void;
  refetchKeys?: any[];
  isValidateValue?: boolean;
}
