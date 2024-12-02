import { InputValue } from '@/@types/element';
import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn, InternalFieldName } from 'react-hook-form';

export interface IInputElemProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (value: InputValue) => void;
  errorMsg?: any;
  showSuccessMsg?: boolean;
  inputSizeType?: string;
  libProps?: Partial<UseFormRegisterReturn<InternalFieldName>>;
}
