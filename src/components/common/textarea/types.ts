import { ReactNode } from 'react';
import { ITextAreaElemProps } from '@/components/common/textarea/elem/types';

export interface ITextareaProps extends ITextAreaElemProps {
  sizeType?: 'small' | 'medium' | 'large';
  isAbleResize?: boolean | undefined;
  showErrorMsg?: boolean | undefined;
  boxChildren?: ReactNode | undefined;
  itemClassName?: any;
  errorMsg?: any;
}
