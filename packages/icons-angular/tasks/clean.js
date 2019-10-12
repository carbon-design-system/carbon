/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const clean = require('../src/clean');
const { reporter } = require('@carbon/cli-reporter');

clean().catch(error => {
  reporter.error(error);
});
