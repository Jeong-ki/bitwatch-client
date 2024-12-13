'use client';

import { OptionItem } from '@/@types/element';
import { Button } from '@/components/common/button';
import { Input } from '@/components/common/input';
import { InputSearch } from '@/components/common/input/search';
import { Select } from '@/components/common/select';
import { Textarea } from '@/components/common/textarea';
import validateRule from '@/lib/react-hook-form';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const SelectOption = [
  { text: 'select_01', value: 'select_value_01' },
  { text: 'select_02', value: 'select_value_02' },
  { text: 'select_03', value: 'select_value_03' },
];

export default function Comp() {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');

  const [isCheckInp, setIsCheckInp] = useState(false);
  const {
    setValue,
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: { inp01: '', formSelect: '', formSearch: '', contents01: '', contents02: '' },
  });

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

  console.log(watch());

  return (
    <div style={{ margin: '10px' }}>
      <Textarea
        value={watch('contents01')}
        placeholder="입력해 주세요."
        errorMsg={errors.contents01?.message}
        libProps={register('contents01')}
        maxLength={20}
        sizeType="large"
      />
      <br />
      <br />
      <Textarea
        value={watch('contents02')}
        placeholder="입력해 주세요."
        errorMsg={errors.contents02?.message}
        libProps={register('contents02')}
      />
      <br />
      <br />
      <InputSearch
        libProps={register('formSearch')}
        value={watch('formSearch')}
        setValue={setValue}
        sizeType="small"
      />
      <br />
      <br />
      <InputSearch
        value={inputValue}
        onChange={(val) => setInputValue(val as string)}
        sizeType="medium"
      />
      <br />
      <br />
      <InputSearch
        value={inputValue}
        onChange={(val) => setInputValue(val as string)}
        sizeType="large"
      />
      <br />
      <br />

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
      <Input value={inputValue} onChange={(val) => setInputValue(val as string)} sizeType="small" />
      <br />
      <br />
      <Input value={inputValue} onChange={(val: any) => setInputValue(val)} sizeType="medium" />
      <br />
      <br />
      <Input value={inputValue} onChange={(val: any) => setInputValue(val)} sizeType="large" />
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
