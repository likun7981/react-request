module.exports = {
  extends: require.resolve('eslint-config-react-app'),
  rules: {
    semi: [2, 'never'],
    'space-before-function-paren': [2, 'always'],
    quotes: [2, 'single', 'avoid-escape'],
    'comma-dangle': [2, 'always-multiline'],
  },
}
