export default {
  files: 'src/components/**/__tests__/**/*.js',
  nodeResolve: true,
  concurrency: 1,
  coverageConfig: {
    report: true,
    reportDir: 'coverage',
    reporters: ['lcov', 'text-summary'],
    include: ['es/components/**/*.js'],
    exclude: [
      'es/components/**/__tests__/**/*',
      'es/components/**/*.stories.js',
      'es/components/**/*.scss.js',
    ],
  },
};
