import { ReactNode, Ref } from 'react';
import { InputElemProps } from '@/components/common/input/elem/types';
import { UseFormSetValue } from 'react-hook-form';
import { FormSize } from '@/types/element';

export interface InputProps extends InputElemProps {
  refProp?: Ref<HTMLDivElement>;
  sizeType?: FormSize;
  inputSizeType?: FormSize;
  showErrorMsg?: boolean | undefined;
  showSuccessMsg?: boolean;
  successMsg?: string;
  boxChildren?: ReactNode | undefined;
  itemChildren?: ReactNode | undefined;
  itemClassName?: any;
  setValue?: UseFormSetValue<any>;
}
