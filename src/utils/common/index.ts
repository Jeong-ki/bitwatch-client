export const getCleaned = (value: number | string) => {
  return `${value}`.replace(/\D/g, '');
};
