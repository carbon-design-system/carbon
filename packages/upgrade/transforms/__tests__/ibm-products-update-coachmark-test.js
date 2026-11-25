/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { defineTest } = require('jscodeshift/dist/testUtils');

defineTest(__dirname, 'ibm-products-update-coachmark');

const fs = require('fs');
const path = require('path');
const { applyTransform } = require('jscodeshift/dist/testUtils');

describe('ibm-products-update-coachmark', () => {
  const transform = require('../ibm-products-update-coachmark');
  const run = (source) =>
    applyTransform(transform, {}, { path: 'test.js', source });

  it('is idempotent', () => {
    const output = fs
      .readFileSync(
        path.join(
          __dirname,
          '..',
          '__testfixtures__',
          'ibm-products-update-coachmark.output.js'
        ),
        'utf8'
      )
      .trim();
    expect(run(output)).toEqual(output);
  });

  it('leaves a Coachmark that is not from @carbon/ibm-products alone', () => {
    const source = [
      "import { Coachmark } from '@carbon/react';",
      '',
      'export const A = () => <Coachmark />;',
    ].join('\n');
    expect(run(source)).toEqual(source);
  });
});
