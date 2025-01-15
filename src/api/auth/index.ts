import { getFetch, postFetch } from '../fetchCore';
import {
  EmailVerificationReq,
  EmailVerificationResData,
  ReissueUserRes,
  SigninReq,
  SigninRes,
  SignupReq,
  SignupRes,
  UsersRes,
} from './types';

/**
 * @title 로그인
 * @api POST /api/user/signin
 */
export const signinUser = (body: SigninReq) => postFetch<SigninRes>('/api/user/signin', body);

/**
 * @title 회원가입
 * @api POST /api/user/signup
 */
export const signupUser = (body: SignupReq) => postFetch<SignupRes>('/api/user/signup', body);

/**
 * @title 인증번호 발송
 * @api POST /api/user/email-verification
 */
export const emailVerification = (body: EmailVerificationReq) =>
  postFetch<EmailVerificationResData>('/api/user/email-verification', body);

/**
 * @title 로그아웃
 * @api POST /api/user/signout
 */
export const signoutUser = () => postFetch('/api/user/signout');

/**
 * @title 유저정보 재발급
 * @api POST /api/user/reissue-user
 */
export const reissueUser = (): Promise<ReissueUserRes> => postFetch('/api/user/reissue-user');

/**
 * @title 유저 정보 호출
 * @api GET /api/user
 */
export const getUsers = (): Promise<UsersRes> => {
  return getFetch('/api/user/all');
};
