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
const { describePublicApi } = require('@carbon/test-utils/public-api');

describePublicApi({
  packageDir: path.resolve(__dirname, '..'),
  sassModules: ['index'],
  generated: ['js/generated', 'scss/generated'],
});
