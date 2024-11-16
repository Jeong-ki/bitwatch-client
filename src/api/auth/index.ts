import { getFetch } from '../fetchCore';

export const getUsers = (): Promise<IUsersRes> => {
  return getFetch('/api/users');
};
