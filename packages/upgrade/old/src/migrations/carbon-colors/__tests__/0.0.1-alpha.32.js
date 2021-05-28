/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { defineInlineTest } = require('../../../tools/testing');

defineInlineTest(
  require.resolve('../0.0.1-alpha.32.js'),
  '0.0.1-alpha.30',
  `
$ibm-colors__blue--50;
$ibm-colors__teal--50;
  color: $ibm-colors__blue--50;
  color: $ibm-colors__teal--50;
  `,
  `
$carbon--blue-50;
$carbon--teal-50;
  color: $carbon--blue-50;
  color: $carbon--teal-50;
  `
);
