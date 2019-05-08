/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const path = require('path');
const meta = require('../../packages/icons/meta.json');

describe('@carbon/icons', () => {
  test.each(meta.map(icon => [icon.moduleName, icon]))(
    '%s is require-able',
    (name, icon) => {
      const filepath = path.resolve(
        __dirname,
        '../../packages/icons',
        icon.outputOptions.file.replace(/es/, 'lib')
      );
      expect(() => {
        require(filepath);
      }).not.toThrow();
    }
  );
});
