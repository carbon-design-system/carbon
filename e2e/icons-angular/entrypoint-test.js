/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

// const fs = require('fs-extra');
// const path = require('path');
// const { LIB } = require('../src/paths');

const timeout = 60 * 1000;

describe.skip('@carbon/icons-angular CommonJS', () => {
  it(
    'should build an entrypoint that is require-able',
    async () => {
      const indexJsPath = path.join(LIB, 'index.js');
      expect(await fs.pathExists(indexJsPath)).toBe(true);

      expect(() => {
        require(indexJsPath);
      }).not.toThrow();
    },
    timeout
  );

  it(
    'should generate .d.ts files',
    async () => {
      const exists = await fs.pathExists(path.join(LIB, 'index.d.ts'));
      expect(exists).toBe(true);
    },
    timeout
  );

  it(
    'should generate .ngfactory.js files',
    async () => {
      const exists = await fs.pathExists(
        path.join(LIB, 'IconModule.ngfactory.js')
      );
      expect(exists).toBe(true);
    },
    timeout
  );
});
