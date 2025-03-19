import { InputValue } from '@/types/element';
import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn, InternalFieldName } from 'react-hook-form';

export interface InputCheckboxElemProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (checked: boolean, value?: InputValue) => void;
  errorMsg?: any;
  libProps?: Partial<UseFormRegisterReturn<InternalFieldName>> & {
    defaultValue?: InputValue;
  };
}
