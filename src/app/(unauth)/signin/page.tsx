'use client';

import { signinUser } from '@/api/auth';
import { Button } from '@/components/common/button';
import { Input } from '@/components/common/input';
import validateRule from '@/lib/react-hook-form';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';

interface Signin {
  accountId: string;
  accountPw: string;
}

export default function Signin() {
  const router = useRouter();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Signin>({
    defaultValues: {
      accountId: '',
      accountPw: '',
    },
  });

  const { mutate: signup } = useMutation({
    mutationFn: signinUser,
    onSuccess: (res) => {
      if (res.status === 200) {
        router.refresh();
        router.push('/');
      }
    },
    onError: (err) => {
      // Alert({
      //   description: err?.message || '',
      //   hasCancelBtn: false,
      // });
    },
  });

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    handleSubmit((data: Signin) => {
      signup(data);
    })(e);
  };

  return (
    <div className="wrap_login">
      <h1 className="tit_login">
        BitWatch
      </h1>
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
                    value={watch('accountId')}
                    title="이메일 입력"
                    showErrorMsg
                    errorMsg={errors.accountId?.message}
                    libProps={register('accountId', validateRule.id)}
                  />
                </div>
                <div className="group_form">
                  <label htmlFor="password">비밀번호</label>
                  <Input
                    id="password"
                    type="password"
                    title="비밀번호 입력"
                    showErrorMsg
                    errorMsg={errors.accountPw?.message}
                    libProps={register('accountPw', validateRule.accountPw)}
                  />
                </div>
                <Button type="submit" className="btn_login" size="medium" color="primary">
                  로그인
                </Button>
              </div>
            </fieldset>
          </form>
          <p className="desc_notice_pw">비밀번호 찾기 | <Link href="/signup">회원가입</Link></p>
        </div>
      </div>
    </div>
  );
}
