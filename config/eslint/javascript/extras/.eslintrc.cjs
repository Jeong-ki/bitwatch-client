module.exports = {
  rules: {
    /**
     * @description
     * @see http://eslint.org/docs/rules/strict
     */
    strict: ['error', 'never'],
    // ------------------------------------------------------------------
    //
    //  ES6
    //
    // ------------------------------------------------------------------
    /**
     * @description var 대신 let과 const를 요구
     * @see http://eslint.org/docs/rules/no-var
     */
    'no-var': 'error', // http://eslint.org/docs/rules/no-var
    /**
     * @description const선언 후 재할당되지 않는 변수에 대한 선언이 필요합니다.
     * @see http://eslint.org/docs/rules/prefer-const
     */
    'prefer-const': 'error',
    // ------------------------------------------------------------------
    //
    //  Variables
    //
    // ------------------------------------------------------------------
    /**
     * @description 외부 범위에 선언된 변수를 숨기는 변수 선언을 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-shadow
     */
    'no-shadow': 'off',
    /**
     * @description 식별자로 사용된 변수명을 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-shadow-restricted-names
     */
    'no-shadow-restricted-names': 'error',
    /**
     * @description 변수가 정의되기 전에는 변수 사용을 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-use-before-define
     */
    'no-use-before-define': 'error',
    /**
     * @description 후행 쉼표를 요구하거나 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/comma-dangle
     */
    'comma-dangle': ['warn', 'never'],
    /**
     * @description 조건식에서 할당 연산자를 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-cond-assign
     */
    'no-cond-assign': ['error', 'always'],
    /**
     * @description 조건에서 상수 표현식을 허용하지 않음.
     * @see http://eslint.org/docs/rules/no-constant-condition
     */
    'no-constant-condition': 'warn',
    /**
     * @description catch조항 에서 예외 재할당을 허용하지 않음.
     * @see http://eslint.org/docs/rules/no-ex-assign
     */
    'no-ex-assign': 'error',
    /**
     * @description 불필요한 부울 캐스트를 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-extra-boolean-cast
     */
    'no-extra-boolean-cast': 'off',
    /**
     * @description 불규칙한 공백을 허용하지 않음
     * @see http://eslint.org/docs/rules/no-irregular-whitespace
     */
    'no-irregular-whitespace': 'error',
    /**
     * @description 전역 개체 속성을 함수로 호출하는 것을 허용하지 않음
     * @see http://eslint.org/docs/rules/no-obj-calls
     */
    'no-obj-calls': 'error',
    /**
     * @description 희소 배열을 허용하지 않음
     * @see http://eslint.org/docs/rules/no-sparse-arrays
     */
    'no-sparse-arrays': 'error',
    /**
     * @description 정의된 범위 내에서 변수 사용을 강제합니다.
     * @see http://eslint.org/docs/rules/block-scoped-var
     */
    'block-scoped-var': 'error',
    // ------------------------------------------------------------------
    //
    //  Best practices
    //
    // ------------------------------------------------------------------
    /**
     * @description return값을 항상 지정하거나 지정하지 않는 명령문이 필요합니다.
     * @see http://eslint.org/docs/rules/consistent-return
     */
    'consistent-return': 'off',
    /**
     * @description 모든 제어문에 대해 일관된 중괄호 스타일을 적용합니다.
     * @see http://eslint.org/docs/rules/curly
     */
    curly: ['error', 'multi-line'],
    /**
     * @description 스위치 제어문에 필수로 default가 있어야 합니다.
     * @see http://eslint.org/docs/rules/default-case
     */
    'default-case': 'off',
    /**
     * @description 가능하다면 점 표기법을 적용하도록 처리
     * @see http://eslint.org/docs/rules/dot-notation
     */
    'dot-notation': [
      'error',
      {
        allowKeywords: true
      }
    ],
    /**
     * @description 다음과 같이 꼭 사용하도록 처리( === or !== )
     * @see http://eslint.org/docs/rules/eqeqeq
     */
    eqeqeq: 'error',
    /**
     * @description for in 을 사용하기 위해서는 if가 꼭 포함되어야 합니다.
     * @see http://eslint.org/docs/rules/guard-for-in
     */
    'guard-for-in': 'error',
    /**
     * @description arguments.caller하고 arguments.callee를 사용하지 않도록 막습니다.
     * @see http://eslint.org/docs/rules/no-caller
     */
    'no-caller': 'error',
    /**
     * @description esle에 불필요한 리턴을 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-else-return
     */
    'no-else-return': 'off',
    /**
     * @description null에 대해 비교 검사시 '===' 에 대해서만 허용합니다.
     * @see http://eslint.org/docs/rules/no-eq-null
     */
    'no-eq-null': 'error',
    /**
     * @description eval() 함수를 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-eval
     */
    'no-eval': 'error',
    /**
     * @description 기본 유형 확장을 허용하지 않음
     * @see http://eslint.org/docs/rules/no-extend-native
     */
    'no-extend-native': 'error',
    /**
     * @description 불필요한 .bind()을 하지 않습니다.
     * @see http://eslint.org/docs/rules/no-extra-bind
     */
    'no-extra-bind': 'error',
    /**
     * @description case명령문 의 폴스루(fallthrough)를 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-fallthrough
     */
    'no-fallthrough': 'error',
    /**
     * @description 넘버릭 리터럴에 소수점을 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-floating-decimal
     */
    'no-floating-decimal': 'error',
    /**
     * @description eval().like 메소드 사용을 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-implied-eval
     */
    'no-implied-eval': 'error',
    /**
     * @description 불필요한 블록을 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-lone-blocks
     */
    'no-lone-blocks': 'error',
    /**
     * @description 루프 문 내에 안전하지 않은 참조가 포함된 함수 선언을 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-loop-func
     */
    'no-loop-func': 'error',
    /**
     * @description 멀티라인 문자열을 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-multi-str
     */
    'no-multi-str': 'error',
    /**
     * @description 네이티브 객체 또는 읽기 전용 전역 변수에 대한 할당을 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-native-reassign
     */
    'no-native-reassign': 'error',
    /**
     * @description 생성자를 사용할 때 할당 또는 비교 이외의 연산자를 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-new
     */
    'no-new': 'error',
    /**
     * @description Function 생성자를 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-new-func
     */
    'no-new-func': 'error',
    /**
     * @description String, Number, Boolean, Object에 생성자를 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-new-wrappers
     */
    'no-new-wrappers': 'error',
    /**
     * @description 8진수 리터럴을 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-octal
     */
    'no-octal': 'error',
    /**
     * @description 문자열 리터럴에서 8진수 이스케이프 시퀀스를 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-octal-escape
     */
    'no-octal-escape': 'error',
    /**
     * @description function에 매개변수 재할당 금지
     * @see http://eslint.org/docs/rules/no-param-reassign
     */
    'no-param-reassign': 'off',
    /**
     * @description __proto__속성 사용을 금지합니다.
     * @see http://eslint.org/docs/rules/no-proto
     */
    'no-proto': 'error',
    /**
     * @description 변수 재선언을 허용하지 않음
     * @see http://eslint.org/docs/rules/no-redeclare
     */
    'no-redeclare': 'error',
    /**
     * @description return 명령문에서 할당 연산자를 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-return-assign
     */
    'no-return-assign': 'off',
    /**
     * @description url에 javascript: 를 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-script-url
     */
    'no-script-url': 'error',
    /**
     * @description 양쪽이 완전히 동일한 비교는 허용되지 않습니다.
     * @see http://eslint.org/docs/rules/no-self-compare
     */
    'no-self-compare': 'error',
    /**
     * @description 쉼표 연산자를 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/no-sequences
     */
    'no-sequences': 'error',
    /**
     * @description 리터럴을 예외로 던지는 것을 허용하지 않음
     * @see http://eslint.org/docs/rules/no-throw-literal
     */
    'no-throw-literal': 'error',
    /**
     * @description with 진술을 허용하지 않음
     * @see http://eslint.org/docs/rules/no-with
     */
    'no-with': 'error',
    /**
     * @description parseInt()을 사용할 때 기수 인수를 일관 되게 사용하도록 강제합니다.
     * @see http://eslint.org/docs/rules/radix
     */
    radix: 'error',
    /**
     * @description 선언 var은 포함 스코프 내의 맨 위에 배치되어야 합니다.
     * @see http://eslint.org/docs/rules/vars-on-top
     */
    'vars-on-top': 'error',
    /**
     * @description 즉각적인 function호출 주위에는 괄호가 필요합니다.
     * @see http://eslint.org/docs/rules/wrap-iife
     */
    'wrap-iife': ['error', 'any'],
    /**
     * @description Yoda" 조건을 요구하거나 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/yoda
     */
    yoda: 'error',
    /**
     * @description 역따옴표, 큰따옴표 또는 작은따옴표를 일관되게 사용하도록 적용합니다.
     * @see http://eslint.org/docs/rules/quotes
     */
    quotes: ['error', 'single', 'avoid-escape'],
    /**
     * @description 쉼표 앞뒤에 일관된 간격을 적용합니다.
     * @see http://eslint.org/docs/rules/comma-spacing
     */
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    /**
     * @description 일관된 쉼표 스타일 적용
     * @see http://eslint.org/docs/rules/comma-style
     */
    'comma-style': ['error', 'last'],
    /**
     * @description 파일 끝에 줄바꿈을 요구하거나 허용하지 않습니다.
     * @see http://eslint.org/docs/rules/eol-last
     */
    'eol-last': 'error',
    /**
     * @description 객체 리터럴 속성의 키와 값 사이에 일관된 간격을 적용합니다.
     * @see http://eslint.org/docs/rules/key-spacing
     */
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    /**
     * @description 생성자 이름이 대문자로 시작해야 합니다.
     * @see http://eslint.org/docs/rules/new-cap
     */
    'new-cap': [
      'error',
      {
        newIsCap: true,
        capIsNew: false,
        capIsNewExceptions: ['RIT', 'Store', 'Actions']
      }
    ],
    /**
     * @description 여러 개의 빈 줄을 허용하지 않음
     * @see http://eslint.org/docs/rules/no-multiple-empty-lines
     */
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2
      }
    ],
    /**
     * @description 함수 식별자와 해당 애플리케이션 사이의 공백을 허용하지 않습니다(더 이상 사용되지 않음)
     * @see http://eslint.org/docs/rules/no-spaced-func
     */
    'no-spaced-func': 'error',
    /**
     * @description 변수가 함수 에서 함께 또는 별도로 선언되도록 강제합니다.
     * @see http://eslint.org/docs/rules/one-var
     */
    'one-var': [
      'error',
      {
        uninitialized: 'always',
        initialized: 'never'
      }
    ],
    /**
     * @description 블록 내 패딩을 요구하거나 허용하지 않음
     * @see http://eslint.org/docs/rules/padded-blocks
     */
    'padded-blocks': ['off', 'never'],
    /**
     * @description 블록 앞에 일관된 간격을 적용합니다.
     * @see http://eslint.org/docs/rules/space-before-blocks
     */
    'space-before-blocks': 'error',
    /**
     * @description function 정의 여는 괄호 앞에 일관된 간격을 적용합니다.
     * @see http://eslint.org/docs/rules/space-before-function-paren
     */
    'space-before-function-paren': ['error', 'never'],
    /**
     * @description function정의 여는 괄호 앞에 일관된 간격을 적용합니다.
     * @see http://eslint.org/docs/rules/space-infix-ops
     */
    'space-infix-ops': 'error'
  }
};
