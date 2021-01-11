module.exports = {
  env: {
    node: true,
    commonjs: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'linebreak-style': ['off', 'windows'],
    'no-console': ['off'],
    'no-underscore-dangle': ['off'],
  },
};
