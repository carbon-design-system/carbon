/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');

module.exports = {
  // Reference for archive id: https://github.com/IBMa/equal-access/blob/master/rule-server/src/static/archives.json
  ruleArchive: 'latest',
  policies: ['Custom_Ruleset'],
  failLevels: ['violation'],
  reportLevels: [
    'violation',
    'potentialviolation',
    'recommendation',
    'potentialrecommendation',
    'manual',
  ],
  outputFormat: ['json'],
  outputFolder: path.join('.avt', 'reports'),
  baselineFolder: path.join('.avt', 'baseline'),
};
