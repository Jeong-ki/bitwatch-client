import { getFetch } from '@/api/fetchCore';
import { UsersRes } from '@/domains/auth/api/types';

/**
 * @title 유저 정보 호출
 * @api GET /user
 */
export const getUsers = (): Promise<UsersRes> => {
  return getFetch('/user/all');
};
