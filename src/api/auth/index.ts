import { getFetch, postFetch } from '../fetchCore';
import {
  EmailVerificationReq,
  EmailVerificationResData,
  SigninReq,
  SigninRes,
  SignupReq,
  SignupRes,
  UsersRes,
} from './types';

/**
 * @title 로그인
 * @api POST /api/users/signin
 */
export const signinUser = (body: SigninReq) => postFetch<SigninRes>('/api/users/signin', body);

/**
 * @title 회원가입
 * @api POST /api/users/signup
 */
export const signupUser = (body: SignupReq) => postFetch<SignupRes>('/api/users/signup', body);

/**
 * @title 인증번호 발송
 * @api POST /api/users/email-verification
 */
export const emailVerification = (body: EmailVerificationReq) =>
  postFetch<EmailVerificationResData>('/api/users/email-verification', body);

// 모든 유저 정보 호출
export const getUsers = (): Promise<UsersRes> => {
  return getFetch('/api/users');
};

/**
 * @title 로그아웃
 * @api POST
 */
export const signoutUser = () => postFetch('/api/users/signout');
