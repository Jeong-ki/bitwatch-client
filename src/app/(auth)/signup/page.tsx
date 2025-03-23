'use client';

import { HTTP_STATUS } from '@/types/enum';
import { Button } from '@/components/common/button';
import { Input } from '@/components/common/input';
import validateRule from '@/lib/react-hook-form';
import Link from 'next/link';
import { SyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSignUp } from '@/domains/auth/api/create-signup';
import { useEmailVerification } from '@/domains/auth/api/post-email-verification';

interface SignupData {
  email: string;
  authNumber: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const [isSendEmail, setIsSendEmail] = useState(false);

  const {
    watch,
    getValues,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupData>({
    defaultValues: {
      email: '',
      authNumber: '',
      nickname: '',
      password: '',
      confirmPassword: ''
    }
  });

  const { mutate: signup } = useSignUp();

  const { mutate: sendEmail } = useEmailVerification({
    mutationConfig: {
      onSuccess: res => {
        if (res.status === HTTP_STATUS.OK) {
          setIsSendEmail(true);
        }
      }
    }
  });

  const handleEmailAuth = () => {
    sendEmail({ email: getValues('email') });
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    handleSubmit((data: SignupData) => {
      signup(data);
    })(e);
  };

  return (
    <div className="wrap_login signup">
      <h1 className="tit_login">BitWatch</h1>
      <div className="wrap_login_form">
        <h2 className="screen_out">회원가입</h2>
        <div className="inner_left">
          <h3 className="tit_sub">회원가입</h3>
          <form onSubmit={onSubmit}>
            <fieldset>
              <legend className="screen_out">회원가입 입력폼</legend>
              <div className="box_login">
                <div className="group_form">
                  <label htmlFor="account_id">이메일</label>
                  <div className="signup_email">
                    <Input
                      id="account_id"
                      value={watch('email')}
                      title="이메일 입력"
                      showErrorMsg
                      errorMsg={errors.email?.message}
                      libProps={register('email', validateRule.email)}
                    />
                    <Button
                      type="button"
                      size="medium"
                      color="primary"
                      onClick={handleEmailAuth}
                      disabled={isSendEmail}>
                      인증하기
                    </Button>
                  </div>
                  {isSendEmail && (
                    <Input
                      id="auth_number"
                      title="인증번호 입력"
                      placeholder="인증번호를 입력해주세요."
                      showErrorMsg
                      errorMsg={errors.authNumber?.message}
                      libProps={register('authNumber', validateRule.required)}
                    />
                  )}
                </div>
                <div className="group_form">
                  <label htmlFor="password">닉네임</label>
                  <Input
                    id="nickname"
                    type="text"
                    title="닉네임 입력"
                    showErrorMsg
                    errorMsg={errors.nickname?.message}
                    libProps={register('nickname', validateRule.nickname)}
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
                <div className="group_form">
                  <label htmlFor="confirm_password">비밀번호 확인</label>
                  <Input
                    id="confirm_password"
                    type="password"
                    title="확인 비밀번호 입력"
                    showErrorMsg
                    errorMsg={errors.confirmPassword?.message}
                    libProps={register(
                      'confirmPassword',
                      validateRule.confirmPassword
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  className="btn_login"
                  size="medium"
                  color="primary">
                  회원가입
                </Button>
              </div>
            </fieldset>
          </form>
          <p className="desc_notice_pw">
            이미 계정이 있으신가요? <Link href="/signin">로그인</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
