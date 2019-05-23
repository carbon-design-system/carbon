/**
 * @jest-environment node
 */

// eslint-disable-next-line strict,lines-around-directive
'use strict';

const path = require('path');
const glob = require('glob');
const { rollup } = require('rollup');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const terser = require('rollup-plugin-terser');
const virtual = require('rollup-plugin-virtual');
const { breakingChangesX } = require('../src/globals/js/feature-flags');

const ignore = [
  'bundle.js',
  'index.js',
  'globals/js/boot.js',
  'globals/js/components.js',
  'globals/js/watch.js',
  '**/*.config.js',
  // TODO: Make Flatpickr tree-shakable
  '**/date-picker.js',
  // Ignore tests
  '**/__tests__/**',
  '**/__mocks__/**',
];

if (breakingChangesX) {
  ignore.push(
    ...[
      'components/carousel/**',
      'components/data-table/**',
      'components/fab/**',
      'components/lightbox/**',
      'components/left-nav/**',
      'components/unified-header/**',
    ]
  );
}

const cwd = path.resolve(__dirname, '../es');
const files = glob.sync('**/*.js', {
  cwd,
  ignore,
});

describe('ES modules', () => {
  let lodashOutput;
  const entry = '__entry_module__';

  beforeAll(async () => {
    const lodashBundle = await rollup({
      input: entry,
      plugins: [
        virtual({
          [entry]: `
            import debounce from 'lodash.debounce';
            /*#__PURE__*/
            (function () { console.log(debounce); })();
          `,
        }),
        commonjs({
          include: /node_modules/,
          sourceMap: false,
        }),
        resolve(),
        terser.terser(),
      ],
      onwarn: (warning, handle) => {
        if (warning.code !== 'EMPTY_BUNDLE') handle(warning);
      },
      treeshake: {
        annotations: false,
      },
    });
    lodashOutput = (await lodashBundle.generate({ format: 'iife' })).output;
  });

  it.each(files)('%s should be tree-shakable', async relativeFilePath => {
    const filepath = path.join(cwd, relativeFilePath);
    const bundle = await rollup({
      input: entry,
      plugins: [
        virtual({
          [entry]: `import ${JSON.stringify(filepath)}`,
        }),
        commonjs({
          include: [
            /node_modules/,
            'src/globals/js/settings.js',
            'src/globals/js/feature-flags.js',
          ],
          sourceMap: false,
        }),
        resolve(),
        replace({
          'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        terser.terser(),
      ],
      onwarn: (warning, handle) => {
        if (warning.code !== 'EMPTY_BUNDLE') handle(warning);
      },
      treeshake: {
        annotations: false,
      },
    });
    const { output } = await bundle.generate({ format: 'iife' });
    // lo-dash seems to remain small chunk of code after tree-shaken
    const code = output
      .map(item => item.code)
      .join('')
      .trim()
      .replace(
        lodashOutput
          .map(item => item.code)
          .join('')
          .trim(),
        ''
      )
      .replace(';window', '')
      .replace('!function(){"use strict"}();', '');
    expect(code).toBe('');
  });
});
