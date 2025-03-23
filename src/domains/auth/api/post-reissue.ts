import { postFetch } from '@/api/fetchCore';
import { CommonResData } from '@/api/types';
import useUserStore from '@/domains/user/store';
import { MutationConfig } from '@/lib/react-query';
import { HTTP_STATUS } from '@/types/enum';
import { useMutation } from '@tanstack/react-query';

interface ReissueUserResData {
  email: string;
  nickname: string;
}

export type ReissueUserRes = CommonResData<ReissueUserResData>;

/**
 * @title 유저정보 재발급
 * @api POST /user/reissue-user
 */
export const reissueUser = (): Promise<ReissueUserRes> =>
  postFetch('/user/reissue-user');

type UseReissueOptions = {
  mutationConfig?: MutationConfig<typeof reissueUser>;
};

export const useReissue = ({ mutationConfig }: UseReissueOptions = {}) => {
  const { setUser } = useUserStore();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: reissueUser,
    onSuccess: (res, variables, context) => {
      if (res.status === HTTP_STATUS.OK && res.data) {
        setUser(res.data);
      }
      onSuccess?.(res, variables, context);
    },
    onError: (err: any, variables, context) => {
      onError?.(err, variables, context);
    },
    ...restConfig
  });
};
