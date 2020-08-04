/*
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
*/
'use strict';

const path = require('path');
const { promisify } = require('util');
const sass = require('node-sass');
const glob = require('glob');

const defaultOptions = {
  includePaths: ['node_modules', '../../../node_modules'],
};
const cwd = path.resolve(__dirname, '../src');
const files = glob.sync('**/*.scss', {
  cwd,
  ignore: ['**/vendor/@carbon/**'],
});

const render = promisify(sass.render);

describe('styles', () => {
  jest.setTimeout(20000);
  it.each(files)('%s should compile', async (relativeFilePath) => {
    const filepath = path.join(cwd, relativeFilePath);
    try {
      expect(
        (
          await render({
            file: filepath,
            ...defaultOptions,
          })
        ).css
      ).toBeDefined();
    } catch (error) {
      const { column, line, message } = error;
      if (message) {
        throw new Error(`${filepath}\n[${line}:${column}] ${message}`);
      }
      throw error;
    }
  });
});
