import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',

    include: ['src/**/*.{test,spec,vitest}.?(c|m)[jt]s?(x)'],

    coverage: {
      provider: 'v8',

      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.test.ts',
        'src/**/*.spec.ts',
        'src/**/*.vitest.ts',
        'src/**/__snapshots__/**',
        '**/node_modules/**',
        '**/dist/**',
      ],

      functions: 0,
      statements: 0,
      lines: 0,
      branches: 0,
    },
  },
});
