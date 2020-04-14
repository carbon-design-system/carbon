/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const Extension = require('../extension');

describe('Extension', () => {
  let extensions;

  beforeEach(() => {
    extensions = {
      a: () => ({
        name: 'a',
      }),
      b: () => ({
        name: 'b',
      }),
      c: () => ({
        before: [extensions.b],
        name: 'c',
      }),
    };
  });

  describe('Extension#load', () => {
    it('should work', () => {
      console.log(Extension.load([extensions.a, extensions.c]));
    });

    // Default

    // Options

    // Mixed

    // Error

    // Before support
  });
});
