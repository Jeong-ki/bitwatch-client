module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react'],
  rules: {
    'import/no-anonymous-default-export': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    //'react/jsx-filename-extension': ['error', { extensions: ['.js', '.tsx'] }]
  }
};
