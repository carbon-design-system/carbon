import { puppeteerLauncher } from '@web/test-runner-puppeteer';

const chromeLaunchArgs = process.env.CI
  ? ['--no-sandbox', '--disable-setuid-sandbox']
  : [];

export default {
  browsers: [
    puppeteerLauncher({
      launchOptions: {
        args: chromeLaunchArgs,
      },
    }),
  ],
  // exclude snapshots from tests
  files: ['src/components/**/__tests__/**/*.js', '!**/__snapshots__/**'],
  nodeResolve: {
    extensions: ['.js', '.ts'],
  },
  concurrency: 1,

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

  // suppress ResizeObserver loops
  testRunnerHtml: (testFramework) => `
    <!DOCTYPE html>
    <html>
      <head>
        <script>
          window.addEventListener(
            'error',
            (event) => {
              if (
                typeof event.message === 'string' &&
                event.message.includes('ResizeObserver loop')
              ) {
                event.stopImmediatePropagation();
                event.preventDefault();
              }
            },
            true
          );
        </script>
      </head>
      <body>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `,
};
