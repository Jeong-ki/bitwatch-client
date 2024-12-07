import { OptionItem } from '@/@types/element';

export interface IOptionList {
  value: OptionItem['value'] | undefined;
  items: OptionItem[];
  compareKey?: keyof OptionItem;
  subCompareKey?: string;
  onClick: (value: OptionItem) => void;
  onEnter?: (e: KeyboardEvent) => void;
  noDataText?: string;
  isOpened: boolean;
  isTopPosition?: boolean;
  compareValue: (value: IOptionList['value'], item: OptionItem) => boolean;
  handleClose: () => void;
}