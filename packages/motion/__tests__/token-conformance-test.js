/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const path = require('path');
const { describeTokenConformance } = require('@carbon/test-utils/tokens');

describeTokenConformance({
  packageDir: path.resolve(__dirname, '..'),
  files: ['src/dtcg/motion.json', 'src/dtcg/surfaces.json'],
  knownFailures: {
    'src/dtcg/motion.json': ['schema-url'],
    'src/dtcg/surfaces.json': ['schema-url', 'extension-namespace'],
  },
});
