export const getCleaned = (value: number | string) => {
  return `${value}`.replace(/\D/g, '');
};

export const isFunction = (value: unknown): value is (...args: any) => any =>
  typeof value === 'function';

export const isDev =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';

export const isEmptyNum = (value: undefined | null | number) => {
  return value === undefined || value === null || Number.isNaN(value);
};

export const addComma = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
