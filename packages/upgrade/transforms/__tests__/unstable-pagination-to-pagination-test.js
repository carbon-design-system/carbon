/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { defineTest } = require('jscodeshift/dist/testUtils');

// unstable_ prefix — PageSelector render-prop child + bare usage
defineTest(__dirname, 'unstable-pagination-to-pagination');

// preview_ prefix — same transform, different fixtures
defineTest(
  __dirname,
  'unstable-pagination-to-pagination',
  null,
  'preview-pagination-to-pagination'
);

// No `pageSizes` — migrated code must not crash on `sizes[0]`
defineTest(
  __dirname,
  'unstable-pagination-to-pagination',
  null,
  'preview-pagination-no-sizer'
);
