/** Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');

const config = {
  packages: [
    {
      directory: path.resolve(
        __dirname,
        '..',
        '..',
        'packages',
        'carbon-react'
      ),
      artifacts: ['es', 'lib', 'umd'],
    },
    {
      directory: path.resolve(__dirname, '..', '..', 'packages', 'cli'),
      artifacts: [],
    },
    {
      directory: path.resolve(
        __dirname,
        '..',
        '..',
        'packages',
        'cli-reporter'
      ),
      artifacts: [],
    },
    {
      directory: path.resolve(__dirname, '..', '..', 'packages', 'colors'),
      artifacts: ['es', 'lib', 'umd', 'scss', 'index.scss'],
    },
    {
      directory: path.resolve(__dirname, '..', '..', 'packages', 'components'),
      artifacts: ['es', 'scripts', 'umd', 'css', 'scss', 'html'],
    },
    {
      directory: path.resolve(__dirname, '..', '..', 'packages', 'elements'),
      artifacts: [
        'es',
        'lib',
        'umd',
        'scss/**',
        '!scss/elements.scss',
        '!scss/index.scss',
      ],
    },
    {
      directory: path.resolve(
        __dirname,
        '..',
        '..',
        'packages',
        'feature-flags'
      ),
      artifacts: ['es', 'lib', 'umd', 'scss'],
    },
    {
      directory: path.resolve(__dirname, '..', '..', 'packages', 'grid'),
      artifacts: [],
    },
  ],
};

module.exports = {
  config,
};
