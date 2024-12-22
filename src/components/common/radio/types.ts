import { RadioItemProps } from '@/components/common/radio/elem/types';

export interface RadioProps extends Omit<RadioItemProps, 'selected'> {
  items: Omit<RadioItemProps, 'selected'>[];
}
