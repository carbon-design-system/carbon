export default {
  files: 'src/components/**/__tests__/**/*.js',
  nodeResolve: true,
  concurrency: 1,

  coverageConfig: {
    report: true,
    reportDir: '../../coverage-web-components',
    reporters: ['lcov'],
  },
};
