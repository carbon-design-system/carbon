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
const {
  checkResolverFile,
  describeTokenConformance,
} = require('@carbon/test-utils/tokens');

const packageDir = path.resolve(__dirname, '..');

describeTokenConformance({
  packageDir,
  include: ['tokens/**/*.tokens.json'],
});

describe('resolver conformance (DTCG 2025.10)', () => {
  test.each([
    'tokens/themes.resolver.json',
    'tokens/next/themes.resolver.json',
  ])('%s', (file) => {
    expect(checkResolverFile(path.join(packageDir, file))).toEqual([]);
  });
});
