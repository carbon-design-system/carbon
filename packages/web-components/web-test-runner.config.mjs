export default {
  files: 'src/components/**/__tests__/**/*.js',
  nodeResolve: true,
  concurrency: 1,

  coverageConfig: {
    report: true,
    reportDir: 'coverage',
    reporters: ['lcov'],

    include: [
      'src/components/**/*.js',
      'src/components/**/*.ts',
      'es/components/**/*.js',
      'es/components/**/*.ts',
    ],
  },
};
