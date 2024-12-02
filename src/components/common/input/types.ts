import { ReactNode, RefObject } from 'react';
import { IInputElemProps } from '@/components/common/input/elem/types';
import { UseFormSetValue } from 'react-hook-form';
import { FormSize } from '@/@types/element';

export interface IInputProps extends IInputElemProps {
  refProp?: RefObject<any>;
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
