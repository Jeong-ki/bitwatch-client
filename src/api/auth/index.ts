import { getFetch, postFetch } from '../fetchCore';
import { EmailVerificationReqBody, EmailVerificationResData, SigninReqBody, SigninResData, SignupReqBody, SignupResData, UsersRes } from './types';

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

/**
 * @title 인증번호 발송
 * @api POST /api/users/email-verification
 */
export const emailVerification = (body: EmailVerificationReqBody) =>
  postFetch<EmailVerificationResData>('/api/users/email-verification', body);

// 모든 유저 정보 호출
export const getUsers = (): Promise<UsersRes> => {
  return getFetch('/api/users');
};