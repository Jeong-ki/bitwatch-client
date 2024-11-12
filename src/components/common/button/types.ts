import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size: 'full' | 'large' | 'medium' | 'small';
  color: 'primary' | 'secondary' | 'gray' | 'black' | 'white_line' | 'gray_line';
}
