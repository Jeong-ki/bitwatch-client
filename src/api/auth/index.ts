import { getFetch, postFetch } from '../fetchCore';
import { SigninReqBody, SigninResData, UsersRes } from './types';

/**
 * @title 로그인
 * @api GET /api/users/signin
 */
export const signinUser = (body: SigninReqBody) =>
  postFetch<SigninResData>('/api/users/signin', { body });

export const getUsers = (): Promise<UsersRes> => {
  return getFetch('/api/users');
};
