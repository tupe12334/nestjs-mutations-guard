module.exports = {
  extends: ['agent'],
  env: {
    node: true,
  },
  ignorePatterns: ['.eslintrc.js', 'dist/**/*', 'node_modules/**/*'],
};