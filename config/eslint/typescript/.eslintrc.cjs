module.exports = {
  extends: ['plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    /**
     * @description 사용하지 않는 변수를 허용하지 않습니다.
     * @see https://typescript-eslint.io/rules/no-unused-vars
     */
    '@typescript-eslint/no-unused-vars': 'warn',
    /**
     * @description type any를 허용하지 않습니다.
     * @see https://typescript-eslint.io/rules/no-explicit-any/
     */
    '@typescript-eslint/no-explicit-any': 'off',
    /**
     * @description @ts-<directive> 주석을 허용하지 않거나 지시문 뒤에 설명을 요구합니다.
     * @see https://typescript-eslint.io/rules/ban-ts-comment/
     */
    '@typescript-eslint/ban-ts-comment': 'off',
    /**
     * @description 매직 넘버를 허용하지 않습니다.
     * @see https://typescript-eslint.io/rules/no-magic-numbers/
     */
    '@typescript-eslint/no-magic-numbers': 'off',
    /**
     * @description 유형 주석 주위에 일관된 간격이 필요합니다.
     * @see https://typescript-eslint.io/rules/type-annotation-spacing/
     */
    '@typescript-eslint/type-annotation-spacing': 'off',
    /**
     * @description ASI 대신 세미콜론을 요구하거나 허용하지 않습니다.
     * @see https://typescript-eslint.io/rules/semi/
     */
    '@typescript-eslint/semi': 'off',
    /**
     * @description 불필요한 세미콜론을 허용하지 않습니다.
     * @see https://typescript-eslint.io/rules/no-extra-semi/
     */
    '@typescript-eslint/no-extra-semi': 'off',
    /**
     * @description 인터페이스 및 유형 리터럴에 대해 특정 멤버 구분 기호 스타일이 필요합니다.
     * @see https://typescript-eslint.io/rules/member-delimiter-style/
     */
    '@typescript-eslint/member-delimiter-style': 'off',
    /**
     * @description 코드베이스 전체에 걸쳐 모든 항목에 명명 규칙을 적용합니다.
     * @see https://typescript-eslint.io/rules/naming-convention/
     */
    '@typescript-eslint/naming-convention': [
      2,
      {
        selector: 'default',
        format: ['camelCase']
      },
      {
        selector: 'import',
        format: ['camelCase', 'PascalCase']
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase', 'snake_case']
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase']
      },
      {
        selector: 'memberLike',
        format: ['camelCase', 'UPPER_CASE']
      },
      {
        selector: 'typeLike',
        format: ['PascalCase', 'UPPER_CASE']
      },
      {
        selector: 'property',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase', 'snake_case'],
      },
      {
        selector: 'method',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase']
      }
    ],
    '@typescript-eslint/no-empty-object-type': 'off'
  },
  ignorePatterns: ['.eslintrc.cjs']
};
