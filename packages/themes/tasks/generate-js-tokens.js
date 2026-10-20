/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { reporter } = require('@carbon/cli-reporter');
const { runJs } = require('../style-dictionary/sd.config');

reporter.info('Generating JS token files via Style Dictionary...');
runJs()
  .then(() => {
    reporter.success('JS token files generated successfully! 🎉');
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
