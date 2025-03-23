import { postFetch } from '@/api/fetchCore';
import { CommonResData } from '@/api/types';
import { Alert } from '@/components/common/alert';
import { MutationConfig } from '@/lib/react-query';
import { HTTP_STATUS } from '@/types/enum';
import { useMutation } from '@tanstack/react-query';

export interface EmailVerificationReq {
  email: string;
}
export type EmailVerificationResData = CommonResData;

/**
 * @title 인증번호 발송
 * @api POST /user/email-verification
 */
export const emailVerification = (body: EmailVerificationReq) =>
  postFetch<EmailVerificationResData>('/user/email-verification', body);

type UseEmailVerificationOptions = {
  mutationConfig?: MutationConfig<typeof emailVerification>;
};

export const useEmailVerification = ({
  mutationConfig
}: UseEmailVerificationOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: emailVerification,
    onSuccess: (res, variables, context) => {
      if (res.status === HTTP_STATUS.OK) {
        Alert({
          description: res.message,
          hasCancelBtn: false
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
