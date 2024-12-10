import { getFetch } from '../fetchCore';

export const getDummy = (params: any): Promise<any> => {
  return getFetch('/api/dummy', { params });
};
