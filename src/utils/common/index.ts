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

export const isTokenValid = (token: string) => {
  try {
    const { exp } = JSON.parse(atob(token.split('.')[1]));
    return Date.now() / 1000 < exp;
  } catch {
    return false;
  }
};
