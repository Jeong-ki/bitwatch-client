import { CommonResData } from '@/api/types';

export interface UsersRes {
  data: {
    id: number;
    email: string;
    password: string;
    role: string;
    first_name: string;
    last_name: string;
    created_at: string;
    updated_at: string;
  }[];
}

export interface SigninReq {
  email: string;
  password: string;
}

interface SigninResData {
  email: string;
  nickname: string;
  accessToken: string;
}
export type SigninRes = CommonResData<SigninResData>;

export interface SignupReq {
  email: string;
  password: string;
  confirmPassword: string;
}

export type SignupRes = CommonResData;

export interface EmailVerificationReq {
  email: string;
}
export type EmailVerificationResData = CommonResData;
