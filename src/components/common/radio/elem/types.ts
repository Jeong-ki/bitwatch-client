import { IInputElemProps } from '@/components/common/input/elem/types';

export interface IRadioItemProps extends Omit<IInputElemProps, 'value'> {
  text?: string;
  value?: any;
  description?: string;
  selected: any;
}
