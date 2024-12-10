import { OptionItem } from '@/@types/element';
import { IInputProps } from '@/components/common/input/types';

export interface IInputSearchProps extends Omit<IInputProps, 'value' | 'onChange'> {
  value?: OptionItem['value'];
  onChange?: (value: OptionItem['value']) => void;
}
