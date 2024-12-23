import { CommonResData } from '../types';

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

export interface SigninReqBody {
  accountId: string;
  accountPw: string;
}
export interface SigninResData extends CommonResData {}

export interface SignupReqBody {
  accountId: string;
  accountPw: string;
  accountConfirmPw: string;
}
export interface SignupResData extends CommonResData {}
