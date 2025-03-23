import { postFetch } from '@/api/fetchCore';
import { CommonResData } from '@/api/types';
import { Alert } from '@/components/common/alert';
import { MutationConfig } from '@/lib/react-query';
import { HTTP_STATUS } from '@/types/enum';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export interface SignupReq {
  email: string;
  password: string;
  confirmPassword: string;
}

export type SignupRes = CommonResData;

/**
 * @title 회원가입
 * @api POST /user/signup
 */
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
