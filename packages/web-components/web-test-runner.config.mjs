import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  files: 'src/components/**/__tests__/*-test.js',
  nodeResolve: true,
  coverage: true,
  coverageConfig: {
    threshold: {
      statements: 60,
      branches: 60,
      // lines: 60,
      // functions: 60,
    },
    exclude: [
      '**/node_modules/**',
      '**/coverage/**',
      '**/*.stories.js',
      '**/*.test.js',
    ],

    include: [
      'src/**/*.js',
      'src/**/*.ts',
      'src/**/*.jsx',
      'src/**/*.tsx',

      '../feature-flags/es/**/*.js',
      '../feature-flags/es/**/*.ts',
    ],
  },
  esbuildTarget: 'auto',
  preserveSymlinks: true,
  plugins: [
    esbuildPlugin(),
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
