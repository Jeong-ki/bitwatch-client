module.exports = {
  rules: {
    // ------------------------------------------------------------------
    //
    //  Variables
    //
    // ------------------------------------------------------------------
    /**
     * @description \/*global \/ 주석 에 언급되지 않은 한 선언되지 않은 변수의 사용을 허용하지 않습니다.
     * @see https://eslint.org/docs/latest/rules/no-undef
     */
    'no-undef': 'error',
    /**
     * @description 사용하지 않는 표현을 허용하지 않음
     * @see http://eslint.org/docs/rules/no-unused-expressions.html
     */
    'no-unused-expressions': [
      'warn',
      {
        //
        allowShortCircuit: true,
        allowTernary: true
      }
    ],
    /**
     * @description 사용되지 않는 변수를 허용하지 않음
     * @see http://eslint.org/docs/rules/no-unused-vars
     */
    'no-unused-vars': [
      'warn',
      {
        vars: 'local',
        args: 'none'
      }
    ],
    // ------------------------------------------------------------------
    //
    //  Possible errors
    //
    // ------------------------------------------------------------------
    /**
     * @description 객체 리터럴에서 중복 키를 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-dupe-keys
     */
    'no-dupe-keys': 'error',
    /**
     * @description 중복 케이스 라벨 허용 안함
     * @see http://eslint.org/docs/rules/no-duplicate-case
     */
    'no-duplicate-case': 'error',
    /**
     * @description 빈 블록 문을 허용하지 않습니다
     * @see http://eslint.org/docs/rules/no-empty
     */
    'no-empty': 'error',
    /**
     * @description 불필요한 세미콜론을 허용하지 않음
     * @see http://eslint.org/docs/rules/no-extra-semi
     */
    'no-extra-semi': 'error',
    /**
     * @description 재할당 function선언을 허용하지 않음
     * @see http://eslint.org/docs/rules/no-func-assign
     */
    'no-func-assign': 'error',
    /**
     * @description function 중첩된 블록의 변수 또는 선언을 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-inner-declarations
     */
    'no-inner-declarations': 'error',
    /**
     * @description RegExp생성자 에서 유효하지 않은 정규식 문자열을 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-invalid-regexp
     */
    'no-invalid-regexp': 'error',
    /**
     * @description return, throw, continue 및 break문 뒤에 연결할 수 없는 코드를 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-unreachable
     */
    'no-unreachable': 'error',
    /**
     * @description NaN을 체크할 때 필수로 isNaN()를 호출해서 체크할 수 있도록 강제화 합니다.
     * @see http://eslint.org/docs/rules/use-isnan
     */
    'use-isnan': 'error',
    // ------------------------------------------------------------------
    //
    //  Best practices
    //
    // ------------------------------------------------------------------
    /**
     * @description ASI 대신 세미콜론을 요구하거나 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/semi
     */
    semi: ['warn', 'always'],
    /**
     * @description 세미콜론 앞뒤에 일관된 간격을 적용합니다.
     * @see http://eslint.org/docs/rules/semi-spacing
     */
    'semi-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    // ------------------------------------------------------------------
    //
    //  Style
    //
    // ------------------------------------------------------------------
    /**
     * @description 일관된 들여쓰기 적용
     * @see http://eslint.org/docs/rules/indent
     */
    indent: [
      'error',
      2,
      {
        SwitchCase: 1
      }
    ],
    /**
     * @description 블록에 일관된 괄호 스타일 적용
     * @see http://eslint.org/docs/rules/brace-style
     */
    'brace-style': [
      'error',
      '1tbs',
      {
        allowSingleLine: true
      }
    ],
    /**
     * @description JSX 속성에서 큰따옴표 또는 작은따옴표를 일관되게 사용하도록 강제합니다.
     * @see http://eslint.org/docs/rules/jsx-quotes.html
     */
    'jsx-quotes': 'error',
    /**
     * @description 카멜케이스 명명 규칙 시행
     * @see http://eslint.org/docs/rules/camelcase
     */
    camelcase: [
      'error',
      {
        properties: 'never'
      }
    ],
    /**
     * @description 중첩된 삼항 표현식을 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-nested-ternary
     */
    'no-nested-ternary': 'off',
    /**
     * @description Object생성자를 허용하지 않음
     * @see http://eslint.org/docs/rules/no-new-object
     */
    'no-new-object': 'off',
    /**
     * @description 줄 끝의 후행 공백을 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-trailing-spaces
     */
    'no-trailing-spaces': 'error',
    /**
     * @description 불필요한 괄호를 허용하지 않음
     * @see http://eslint.org/docs/rules/no-extra-parens
     */
    'no-extra-parens': ['error', 'functions'],
    /**
     * @description 식별자에 매달린 밑줄을 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-underscore-dangle
     */
    'no-underscore-dangle': 'off'
  }
};
