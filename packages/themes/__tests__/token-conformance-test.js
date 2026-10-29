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
  test('tokens/themes.resolver.json', () => {
    expect(
      checkResolverFile(path.join(packageDir, 'tokens/themes.resolver.json'))
    ).toEqual([]);
  });
});
