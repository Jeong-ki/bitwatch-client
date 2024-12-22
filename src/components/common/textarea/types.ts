import { ReactNode } from 'react';
import { TextAreaElemProps } from '@/components/common/textarea/elem/types';

export interface TextareaProps extends TextAreaElemProps {
  sizeType?: 'small' | 'medium' | 'large';
  isAbleResize?: boolean | undefined;
  showErrorMsg?: boolean | undefined;
  boxChildren?: ReactNode | undefined;
  itemClassName?: any;
  errorMsg?: any;
}
