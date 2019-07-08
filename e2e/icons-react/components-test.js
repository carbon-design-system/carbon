/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const meta = require('../../packages/icons/build-info.json');

describe('@carbon/icons-react', () => {
  test('entrypoint is require-able', () => {
    expect(() => {
      require('@carbon/icons-react');
    }).not.toThrow();
  });

  test.each(meta.map(icon => [icon.moduleName]))('%s is require-able', name => {
    expect(require('@carbon/icons-react')[name]).toBeDefined();
  });
});
