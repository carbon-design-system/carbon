/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Runner from 'jscodeshift/src/Runner';

export async function run(options) {
  const {
    dry,
    parser = 'babylon',
    paths,
    print = dry,
    transform,
    verbose,
  } = options;
  await Runner.run(transform, paths, {
    dry,
    parser,
    parserConfig: {
      sourceType: 'module',
      allowHashBang: true,
      ecmaVersion: Infinity,
      allowImportExportEverywhere: true,
      allowReturnOutsideFunction: true,
      startLine: 1,
      tokens: true,
      plugins: [
        'estree',
        'jsx',
        'typescript',
        'asyncGenerators',
        'classProperties',
        'doExpressions',
        'exportDefaultFrom',
        'exportExtensions',
        'functionBind',
        'functionSent',
        'objectRestSpread',
        'dynamicImport',
        'nullishCoalescingOperator',
        'optionalChaining',
        ['decorators', { decoratorsBeforeExport: false }],
      ],
    },
    print,
    ignorePattern: [
      '**/build/**',
      '**/dist/**',
      '**/es/**',
      '**/lib/**',
      '**/node_modules/**',
      '**/storybook-static/**',
      '**/umd/**',
      '*.md',
      '*.mdx',
      '*.css',
      '*.scss',
      '.DS_Store',
      '.gitignore',
      'yarn.lock',
    ],
    verbose: verbose === true ? 2 : 0,
  });
}
