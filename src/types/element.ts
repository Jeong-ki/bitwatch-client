export type InputValue = string | readonly string[] | number | undefined;

export type FormSize = 'small' | 'medium' | 'large' | 'full';

export type OptionItem = {
  value: string;
  text: string;
  textValue?: string;
  data?: any;
  disabled?: boolean;
};
