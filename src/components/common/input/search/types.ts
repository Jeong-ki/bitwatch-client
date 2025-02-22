import { OptionItem } from '@/@types/element';
import { InputProps } from '@/components/common/input/types';

export interface InputSearchProps
  extends Omit<InputProps, 'value' | 'onChange'> {
  value?: OptionItem['value'];
  onChange?: (value: string) => void;
}
