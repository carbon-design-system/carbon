/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { defineTest } = require('jscodeshift/dist/testUtils');

// Basic rename: white/g10 → light, g90/g100 → dark
defineTest(__dirname, 'enable-v12-theme-names', null, 'enable-v12-theme-names');

// Nested same-group: inner <Theme> becomes <Layer>; different-group: both rename
defineTest(
  __dirname,
  'enable-v12-theme-names',
  null,
  'enable-v12-theme-names-nested'
);
