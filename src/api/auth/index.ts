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
 * @api POST /user/signin
 */
export const signinUser = (body: SigninReq) => postFetch<SigninRes>('/user/signin', body);

/**
 * @title 회원가입
 * @api POST /user/signup
 */
export const signupUser = (body: SignupReq) => postFetch<SignupRes>('/user/signup', body);

/**
 * @title 인증번호 발송
 * @api POST /user/email-verification
 */
export const emailVerification = (body: EmailVerificationReq) =>
  postFetch<EmailVerificationResData>('/user/email-verification', body);

/**
 * @title 로그아웃
 * @api POST /user/signout
 */
export const signoutUser = () => postFetch('/user/signout');

/**
 * @title 유저정보 재발급
 * @api POST /user/reissue-user
 */
export const reissueUser = (): Promise<ReissueUserRes> => postFetch('/user/reissue-user');

/**
 * @title 유저 정보 호출
 * @api GET /user
 */
export const getUsers = (): Promise<UsersRes> => {
  return getFetch('/user/all');
};
