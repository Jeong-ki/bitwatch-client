'use client';

import { Alert } from '@/components/common/alert';
import { Button } from '@/components/common/button';
import { Input } from '@/components/common/input';
import { signinUser } from '@/domains/auth/api';
import validateRule from '@/lib/react-hook-form';
import useAuthStore from '@/domains/auth/store';
import useUserStore from '@/domains/user/store';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { HTTP_STATUS } from '@/types/enum';

interface SigninData {
  email: string;
  password: string;
}

export default function Signin() {
  const router = useRouter();
  const { setUser } = useUserStore();
  const { setAccessToken } = useAuthStore();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SigninData>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const { mutate: signin } = useMutation({
    mutationFn: signinUser,
    onSuccess: res => {
      if (res.status === HTTP_STATUS.OK) {
        const { email, nickname, accessToken } = res.data!;
        setUser({ email, nickname });
        setAccessToken(accessToken);
        router.push('/');
      }
    },
    onError: err => {
      Alert({
        description: err?.message || '',
        hasCancelBtn: false
      });
    }
  });

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    handleSubmit((data: SigninData) => {
      signin(data);
    })(e);
  };

  return (
    <div className="wrap_login">
      <h1 className="tit_login">BitWatch</h1>
      <div className="wrap_login_form">
        <h2 className="screen_out">로그인</h2>
        <div className="inner_left">
          <h3 className="tit_sub">로그인</h3>
          <form onSubmit={onSubmit}>
            <fieldset>
              <legend className="screen_out">로그인 입력폼</legend>
              <div className="box_login">
                <div className="group_form">
                  <label htmlFor="account_id">이메일</label>
                  <Input
                    id="account_id"
                    value={watch('email')}
                    title="이메일 입력"
                    showErrorMsg
                    errorMsg={errors.email?.message}
                    libProps={register('email', validateRule.email)}
                  />
                </div>
                <div className="group_form">
                  <label htmlFor="password">비밀번호</label>
                  <Input
                    id="password"
                    type="password"
                    title="비밀번호 입력"
                    showErrorMsg
                    errorMsg={errors.password?.message}
                    libProps={register('password', validateRule.password)}
                  />
                </div>
                <Button
                  type="submit"
                  className="btn_login"
                  size="medium"
                  color="primary">
                  로그인
                </Button>
              </div>
            </fieldset>
          </form>
          <p className="desc_notice_pw">
            비밀번호 찾기 | <Link href="/signup">회원가입</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
