import { CommonResData } from '@/api/types';

interface ReissueUserResData {
  email: string;
  nickname: string;
}

export type ReissueUserRes = CommonResData<ReissueUserResData>;
