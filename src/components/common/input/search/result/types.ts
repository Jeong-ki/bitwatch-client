import { OptionItem } from '@/@types/element';
import { IInputSearchProps } from '../types';

type TSuggestType = 'test1' | 'test2';

export interface IInputSearchSuggestProps extends IInputSearchProps {
  suggestType?: TSuggestType;
  isAllowClickOutside?: boolean;
  isStrictCheck?: boolean;
  isExactMatchValue?: boolean;
  onSelectExactValue?: (item: OptionItem) => void;
}
