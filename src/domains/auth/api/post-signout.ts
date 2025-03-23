import { postFetch } from '@/api/fetchCore';
import { MutationConfig } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

/**
 * @title 로그아웃
 * @api POST /user/signout
 */
export const signoutUser = () => postFetch('/user/signout');

type UseSignOutOptions = {
  mutationConfig?: MutationConfig<typeof signoutUser>;
};

export const useSignOut = ({ mutationConfig }: UseSignOutOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: signoutUser,
    onSuccess: (res, variables, context) => {
      onSuccess?.(res, variables, context);
    },
    onError: (err: any, variables, context) => {
      onError?.(err, variables, context);
    },
    ...restConfig
  });
};
