'use client';

import { OptionItem } from '@/@types/element';
import { Button } from '@/components/common/button';
import { Input } from '@/components/common/input';
import { Select } from '@/components/common/select';
import validateRule from '@/lib/react-hook-form';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const SelectOption = [
  { text: 'select_01', value: 'select_value_01' },
  { text: 'select_02', value: 'select_value_02' },
  { text: 'select_03', value: 'select_value_03' },
];

export default function Comp() {
  const [value, setValue] = useState('');
  const [selectValue, setSelectValue] = useState('');

  const [isCheckInp, setIsCheckInp] = useState(false);
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: { inp01: '', formSelect: '' } });

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

  const handleCheckValue = (value: OptionItem['value']) => {
    setSelectValue(value as string);
  };

  console.log(watch('formSelect'));

  return (
    <div style={{ margin: '10px' }}>
      <Select
        formSize="small"
        value={selectValue}
        onChange={handleCheckValue}
        suggestList={SelectOption}
      />
      <br />
      <br />
      <Select
        formSize="medium"
        value={selectValue}
        onChange={handleCheckValue}
        suggestList={SelectOption}
      />
      <br />
      <br />
      <Select
        formSize="large"
        value={watch('formSelect')}
        libProps={register('formSelect')}
        suggestList={SelectOption}
      />
      <br />
      <br />
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
