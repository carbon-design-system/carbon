/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { defineTest } = require('jscodeshift/dist/testUtils');

// covers:
// - side-effect collapse: i.e. 3 data-table class imports into 1 barrel
// - default value import: named value import with barrel already present;
//   type-only imports
// - tpre-existing barrels
defineTest(__dirname, 'wc-add-barrel-imports', null, 'wc-add-barrel-imports');
