import dayjs from '@/lib/dayjs';
import { getCleaned } from '@/utils/common';

const valueAsNumber = {
  setValueAs: (value: string | number): number | null => {
    const cleand = getCleaned(value);
    return cleand ? +cleand : null;
  },
};

const valueAsDateSameOrAfterToday = {
  setValueAs: (value: string): string | null => {
    return dayjs(value).isSameOrAfter(dayjs(), 'day') ? value : null;
  },
};

const validteDate = {
  validate: (value: string | number | undefined): boolean => {
    return dayjs(value).isValid();
  },
};

const validateRule = {
  valueAsNumber,
  getRequired: (typeName: string) => {
    const obj = {
      setValueAs: (value: any) => {
        return typeof value === 'string' ? value.trimStart() : value;
      },
      required: {
        value: true,
        message: typeName,
      },
    };
    return obj;
  },
  getRequiredNum: (typeName: string) => {
    const obj = {
      required: {
        value: true,
        message: typeName,
      },
      ...valueAsNumber,
    };
    return obj;
  },
  getRequiredDate: (typeName: string) => {
    const obj = {
      required: {
        value: true,
        message: typeName,
      },
      ...validteDate,
    };
    return obj;
  },
  getRequiredDateRange: (typeName: string) => {
    const obj = {
      required: {
        value: true,
        message: typeName,
      },
      ...valueAsDateSameOrAfterToday,
    };
    return obj;
  },

  required: {
    required: {
      value: true,
      message: '필수값을 확인해주세요.',
    },
  },
  requiredNum: {
    required: {
      value: true,
      message: '필수값을 확인해주세요.',
    },
    ...valueAsNumber,
  },
  requiredDate: {
    required: {
      value: true,
      message: '필수값을 확인해주세요.',
    },
    ...valueAsDateSameOrAfterToday,
  },
  id: {
    required: {
      value: true,
      message: '아이디를 입력해주세요.',
    },
    pattern: {
      value: /[a-z0-9]+/,
      message: '5~30자의 영문 소문자, 숫자만 사용 가능합니다.',
    },
    minLength: {
      value: 5,
      message: '5~30자의 영문 소문자, 숫자만 사용 가능합니다.',
    },
    maxLength: {
      value: 30,
      message: '5~30자의 영문 소문자, 숫자만 사용 가능합니다.',
    },
  },
  password: {
    required: {
      value: true,
      message: '비밀번호를 입력해주세요.',
    },
  },
  email: {
    required: {
      value: true,
      message: '이메일을 입력해주세요.',
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: '올바른 이메일 형식으로 입력해주세요.',
    },
  },
  phone: {
    required: {
      value: true,
      message: '연락처',
    },
    pattern: {
      value: /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/,
      message: '휴대폰 번호를 확인해 주세요.',
    },
  },
};

export default validateRule;
