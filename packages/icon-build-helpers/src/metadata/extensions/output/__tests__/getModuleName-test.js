/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { getModuleName } = require('../getModuleName');

// Size
// Size in beginning
// Icon vs pictogram vs glyph
// namespace
// preferred??

const cases = [
  [
    'test one',
    {
      name: 'test',
      size: 16,
      namespace: [],
      descriptor: {
        attrs: {
          width: 16,
          height: 16,
        },
      },
    },
    'Test16',
  ],
];

test.each(cases)('%s', (_name, options, expected) => {
  // expect(
  // getModuleName(
  // options.name,
  // options.size,
  // options.namespace,
  // options.descriptor
  // )
  // ).toBe(expected);
});
