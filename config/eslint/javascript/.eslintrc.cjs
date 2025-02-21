module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: ['./base/.eslintrc.cjs', './extras/.eslintrc.cjs'].map(
    require.resolve
  )
};
