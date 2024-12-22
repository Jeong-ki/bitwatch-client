import { InputElemProps } from '@/components/common/input/elem/types';

export interface RadioItemProps extends Omit<InputElemProps, 'value'> {
  text?: string;
  value?: any;
  description?: string;
  selected: any;
}
