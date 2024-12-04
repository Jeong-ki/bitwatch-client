'use client';

import { Button } from '@/components/common/button';
import { Input } from '@/components/common/input';
import validateRule from '@/lib/react-hook-form';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Comp() {
  const [value, setValue] = useState('');
  const [isCheckInp, setIsCheckInp] = useState(false);
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: { inp01: '' } });

  console.log(watch('inp01'));
  console.log(errors);

  const onSubmit = handleSubmit(
    (data) => {
      console.log('submit data: ', data);
      setIsCheckInp(true);
    },
    (err) => {
      console.log('submit error: ', err);
      setIsCheckInp(false);
    },
  );

  return (
    <div style={{ margin: '10px' }}>
      <Input value={value} onChange={(val) => setValue(val as string)} sizeType="small" />
      <br />
      <br />
      <Input value={value} onChange={(val: any) => setValue(val)} sizeType="medium" />
      <br />
      <br />
      <Input value={value} onChange={(val: any) => setValue(val)} sizeType="large" />
      <br />
      <br />

      <Input
        placeholder="register input"
        libProps={register('inp01', validateRule.required)}
        errorMsg={errors.inp01?.message}
        showErrorMsg
        successMsg="인증되었습니다."
        showSuccessMsg={isCheckInp}
      />
      <Button color="primary" size="medium" onClick={onSubmit}>
        Submit
      </Button>
      <br />
      <br />
      <br />
      <br />

      <Button color="primary" size="medium">
        Button
      </Button>
      <Button color="primary" size="medium" disabled>
        Button
      </Button>
      <Button color="primary" size="small">
        Button
      </Button>
      <Button color="primary" size="large">
        Button
      </Button>
      <br />
      <br />
      <Button color="secondary" size="medium">
        Button
      </Button>
      <Button color="secondary" size="medium" disabled>
        Button
      </Button>
      <Button color="secondary" size="small">
        Button
      </Button>
      <Button color="secondary" size="large">
        Button
      </Button>
      <br />
      <br />
      <Button color="danger" size="medium">
        Button
      </Button>
      <Button color="danger" size="medium" disabled>
        Button
      </Button>
      <Button color="danger" size="small">
        Button
      </Button>
      <Button color="danger" size="large">
        Button
      </Button>
      <br />
      <br />
      <Button color="invisible" size="medium">
        Button
      </Button>
      <Button color="invisible" size="medium" disabled>
        Button
      </Button>
      <Button color="invisible" size="small">
        Button
      </Button>
      <Button color="invisible" size="large">
        Button
      </Button>
    </div>
  );
}
