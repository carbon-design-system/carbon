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

const cases = [
  [
    'without size',
    {
      name: 'test',
      namespace: [],
    },
    'Test',
  ],
  [
    'with size',
    {
      name: 'test',
      size: '32',
      namespace: [],
    },
    'Test32',
  ],
  [
    'with namespace',
    {
      name: 'test',
      size: '32',
      namespace: ['acme'],
    },
    'AcmeTest32',
  ],
  [
    'with kebab-case',
    {
      name: 'test-foo-bar',
      size: '32',
      namespace: [],
    },
    'TestFooBar32',
  ],
  [
    'with variant',
    {
      name: 'test--foo',
      size: '32',
      namespace: [],
    },
    'TestFoo32',
  ],
  [
    'with invalid identifier as first character',
    {
      name: '1-test',
      size: '32',
      namespace: [],
    },
    '_1Test32',
  ],
  [
    'with glyph',
    {
      name: 'test',
      size: 'glyph',
      namespace: [],
    },
    'TestGlyph',
  ],
];

test.each(cases)('%s', (_name, options, expected) => {
  expect(getModuleName(options.name, options.size, options.namespace)).toBe(
    expected
  );
});
