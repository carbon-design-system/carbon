/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { resolve } = require('path');
const { sync: glob } = require('glob');
import { scssCheck } from './test-helper';

const g = (globString) =>
  glob(resolve(__dirname, globString), {
    nodir: true, // cspell:disable-line
    nosort: true, // cspell:disable-line
  });
const scssAll = [
  ...g('../*.scss'),
  ...g('../components/*.scss'),
  ...g('../components/**/_index.scss'),
];

describe('SCSS entry points', () => {
  // This test will fail for any of our SCSS entry points that does not compile.
  scssAll.forEach((file) =>
    it(`${file.match(/\/src\/(.*)/)[1]} compiles as valid SCSS`, async () => {
      expect(() => scssCheck(file)).not.toThrow();
    })
  );
});
