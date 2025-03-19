import { OptionItem } from '@/types/element';
import { InputSearchProps } from '../types';

type SuggestType = 'test1' | 'test2';

export interface InputSearchResultProps extends InputSearchProps {
  suggestType?: SuggestType;
  isAllowClickOutside?: boolean;
  isStrictCheck?: boolean;
  isExactMatchValue?: boolean;
  onSelectExactValue?: (item: OptionItem) => void;
}
