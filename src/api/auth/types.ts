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
  email: string;
  password: string;
}
export interface SigninResData extends CommonResData {}

export interface SignupReqBody {
  email: string;
  password: string;
  confirmPassword: string;
}
export interface SignupResData extends CommonResData {}
