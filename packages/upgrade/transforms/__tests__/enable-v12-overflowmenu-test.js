/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { defineTest } = require('jscodeshift/dist/testUtils');

// Test with wrapping (default)
defineTest(
  __dirname,
  'enable-v12-overflowmenu',
  { wrapWithFeatureFlag: 'true' },
  'enable-v12-overflowmenu'
);

// Test without wrapping
defineTest(
  __dirname,
  'enable-v12-overflowmenu',
  { wrapWithFeatureFlag: 'false' },
  'enable-v12-overflowmenu-nowrap'
);
