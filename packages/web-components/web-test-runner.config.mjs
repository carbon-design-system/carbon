export default {
  files: 'src/components/**/__tests__/*-test.js',
  nodeResolve: true,
  coverage: true,
  coverageConfig: {
    threshold: {
      statements: 60,
      branches: 60,
      functions: 60,
      lines: 60,
    },
    exclude: [
      '**/node_modules/**',
      '**/coverage/**',
      '**/*.stories.js',
      '**/*.test.js',
    ],
  },

  preserveSymlinks: true,
  plugins: [
    {
      name: 'resolve-typescript',
      transform(context) {
        if (
          context.path.endsWith('.ts') &&
          !context.path.endsWith('.test.ts')
        ) {
          return {
            body: context.body,
            headers: { 'content-type': 'application/javascript' },
          };
        }
      },
    },
  ],
};
