import { getFetch, postFetch } from '../fetchCore';
import { SigninReqBody, SigninResData, SignupReqBody, SignupResData, UsersRes } from './types';

/**
 * @title 로그인
 * @api POST /api/users/signin
 */
export const signinUser = (body: SigninReqBody) =>
  postFetch<SigninResData>('/api/users/signin', body);

/**
 * @title 회원가입
 * @api POST /api/users/signup
 */
export const signupUser = (body: SignupReqBody) =>
  postFetch<SignupResData>('/api/users/signup', body);

export const getUsers = (): Promise<UsersRes> => {
  return getFetch('/api/users');
};