import { postFetch } from '@/api/fetchCore';
import { CommonResData } from '@/api/types';
import { Alert } from '@/components/common/alert';
import { MutationConfig } from '@/lib/react-query';
import { HTTP_STATUS } from '@/types/enum';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

export const signupSchema = z
  .object({
    email: z.string().email('유효한 이메일 주소를 입력해주세요.'),
    nickname: z.string().min(2, '닉네임은 최소 2자 이상이어야 합니다.'),
    authNumber: z.string().min(6, '인증번호는 6자리로 입력해주세요.'),
    password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요.')
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword']
  });

export type SignupReq = z.infer<typeof signupSchema>;

export type SignupRes = CommonResData;

export const signupUser = (body: SignupReq) =>
  postFetch<SignupRes>('/user/signup', body);

type UseSignUpOptions = {
  mutationConfig?: MutationConfig<typeof signupUser>;
};

export const useSignUp = ({ mutationConfig }: UseSignUpOptions = {}) => {
  const router = useRouter();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: signupUser,
    onSuccess: (res, variables, context) => {
      if (res.status === HTTP_STATUS.CREATED) {
        Alert({
          description: res?.message || '',
          hasCancelBtn: false
        }).then(({ isConfirm }) => {
          if (isConfirm) {
            router.push('/signin');
          }
        });
      }
      onSuccess?.(res, variables, context);
    },
    onError: (err: any, variables, context) => {
      console.log('onError: ', err.message);
      Alert({
        description: err?.message || '',
        hasCancelBtn: false
      });
      onError?.(err, variables, context);
    },
    ...restConfig
  });
};
