import { fromRollup } from '@web/dev-server-rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const resolve = fromRollup(nodeResolve);

export default {
  files: 'src/components/**/__tests__/**/*.js',
  nodeResolve: true,
  concurrency: 1,

  plugins: [
    resolve({
      extensions: ['.js', '.ts'],
    }),
  ],

  rootDir: '.',

  coverage: true,
  coverageConfig: {
    report: true,
    reportDir: 'coverage',
    reporters: ['lcov', 'text-summary', 'html'],

    include: [
      'es/components/**/*.js',
      '!es/components/**/index.js',
      '!es/components/**/__tests__/**/*',
    ],

    exclude: [
      'node_modules/**/*',
      'coverage/**/*',
      '**/*.stories.js',
      '**/*.scss',
      'tests/**/*',
      '.storybook/**/*',
    ],

    sourceMap: true,
    all: true,

    // thresholds can be modified once all components have unit tests
    threshold: {
      statements: 60,
      branches: 60,
      functions: 60,
      lines: 60,
    },
  },

  middleware: [
    (context, next) => {
      const url = context.url;

      // Serve source maps with correct headers
      if (url.endsWith('.js.map')) {
        context.type = 'application/json';
        context.set('Access-Control-Allow-Origin', '*');
      }

      // Add source map headers for component JS files
      if (
        url.endsWith('.js') &&
        url.includes('/components/') &&
        !url.includes('__tests__')
      ) {
        context.set('SourceMap', url + '.map');
      }

      return next();
    },
  ],

  testFramework: {
    config: {
      timeout: 5000,
    },
  },
};
