/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { PHASE_PRODUCTION_BUILD } = require('next/constants');
const path = require('path');

const nextConfig = {
  turbopack: {
    root: path.resolve(__dirname, '../../../..'),
  },
};

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_PRODUCTION_BUILD) {
    return {
      ...nextConfig,
      basePath: '/themes/examples/preview',
      output: 'export',
      distDir: 'build',
    };
  }

  return {
    ...defaultConfig,
    ...nextConfig,
  };
};
