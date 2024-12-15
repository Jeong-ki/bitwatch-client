import { IRadioItemProps } from '@/components/common/radio/elem/types';

export interface IRadioProps extends Omit<IRadioItemProps, 'selected'> {
  items: Omit<IRadioItemProps, 'selected'>[];
}
