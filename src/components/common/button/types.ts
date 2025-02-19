import { ButtonHTMLAttributes, Ref } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: 'large' | 'medium' | 'small';
  color?: 'primary' | 'secondary' | 'danger' | 'invisible';
  btnRef?: Ref<HTMLButtonElement>;
}
