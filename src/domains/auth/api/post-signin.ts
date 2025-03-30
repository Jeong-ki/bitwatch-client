import { postFetch } from '@/api/fetchCore';
import { CommonResData } from '@/api/types';
import useUserStore from '@/domains/user/store';
import { MutationConfig } from '@/lib/react-query';
import { HTTP_STATUS } from '@/types/enum';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import useAuthStore from '../store';
import { Alert } from '@/components/common/alert';
import { z } from 'zod';

export const signinSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력해주세요.'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
});
export type SigninReq = z.infer<typeof signinSchema>;

interface SigninResData {
  email: string;
  nickname: string;
  accessToken: string;
}
export type SigninRes = CommonResData<SigninResData>;

/**
 * @title 로그인
 * @api POST /user/signin
 */
export const signinUser = (body: SigninReq) =>
  postFetch<SigninRes>('/user/signin', body);

type UseSigninOptions = {
  mutationConfig?: MutationConfig<typeof signinUser>;
};

export const useSignIn = ({ mutationConfig }: UseSigninOptions = {}) => {
  const router = useRouter();
  const { setUser } = useUserStore();
  const { setAccessToken } = useAuthStore();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: signinUser,
    onSuccess: (res, variables, context) => {
      if (res.status === HTTP_STATUS.OK && res.data) {
        const { email, nickname, accessToken } = res.data;
        setUser({ email, nickname });
        setAccessToken(accessToken);
        router.push('/');
      }
      onSuccess?.(res, variables, context);
    },
    onError: (err: any, variables, context) => {
      Alert({
        description: err?.message ?? '',
        hasCancelBtn: false
      });
      onError?.(err, variables, context);
    },
    ...restConfig
  });
};
