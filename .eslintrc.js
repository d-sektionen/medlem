module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  parser: 'babel-eslint',
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    //'react/forbid-prop-types': 0,
    'no-bitwise': 0,
  },
  env: {
    browser: true,
    node: true,
  },
  settings: {
    'import/parser': 'babel-eslint',
  },
}
