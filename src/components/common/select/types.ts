import { FormSize, InputValue, OptionItem } from '@/@types/element';
import { InternalFieldName, UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';

export interface SelectProps {
  placeholder?: string;
  formSize?: FormSize;
  suggestList: OptionItem[] | undefined;
  value: OptionItem['value'];
  disabled?: boolean;
  readOnly?: boolean;
  errorMsg?: any;
  onChange?: (value: OptionItem['value'], item?: OptionItem) => void;
  setValue?: UseFormSetValue<any>;
  libProps?: Partial<UseFormRegisterReturn<InternalFieldName>> & { defaultValue?: InputValue };
  noDataText?: string;
}
