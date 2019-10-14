/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const generate = require('../src/generate');
const { reporter } = require('@carbon/cli-reporter');

generate().catch(error => {
  reporter.error(error);
});
