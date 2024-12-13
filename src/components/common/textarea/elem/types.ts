import { InputValue } from '@/@types/element';
import { TextareaHTMLAttributes } from 'react';
import { UseFormRegisterReturn, InternalFieldName } from 'react-hook-form';

export interface ITextAreaElemProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'> {
  value?: string;
  libProps?: Partial<UseFormRegisterReturn<InternalFieldName>>;
  onChange?: (value: InputValue) => void;
}
