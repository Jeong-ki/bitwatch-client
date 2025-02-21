import { getFetch, postFetch } from '@/api/fetchCore';
import { ReissueUserRes } from './types';
import { UsersRes } from '@/domains/auth/api/types';

/**
 * @title 유저정보 재발급
 * @api POST /user/reissue-user
 */
export const reissueUser = (): Promise<ReissueUserRes> =>
  postFetch('/user/reissue-user');

/**
 * @title 유저 정보 호출
 * @api GET /user
 */
export const getUsers = (): Promise<UsersRes> => {
  return getFetch('/user/all');
};
