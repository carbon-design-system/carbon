/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { createHash } = require('crypto');
const fs = require('fs');
const sass = require('node-sass');
const path = require('path');

const THIS_FILE = fs.readFileSync(__filename);

module.exports = {
  process(file, filepath) {
    const result = sass.renderSync({
      file: filepath,
      outputStyle: 'compressed',
    });
    return `
      const css = \`${result.css.toString()}\`;
      let style;

      beforeAll(() => {
        style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
      });

      afterAll(() => {
        document.head.removeChild(style);
      });
    `;
  },
  getCacheKey(file, filename, configString, { rootDir }) {
    // Inspired by babel-jest:
    // https://github.com/facebook/jest/blob/164e2095642420c393236e21dcaeddfdfb507c76/packages/babel-jest/src/index.ts#L80
    //
    // This creates a unique hash that will change when any of the values passed
    // to .update() changes. At a high level, this will control whether or not
    // this transform will be reloaded, or not, and depends on things like the
    // current transform file (this file), the given file, file location and
    // configuration for the runner itself
    return createHash('md5')
      .update(THIS_FILE)
      .update('\0', 'utf8')
      .update(file)
      .update('\0', 'utf8')
      .update(path.relative(rootDir, filename))
      .update('\0', 'utf8')
      .update(configString)
      .update('\0', 'utf8')
      .digest('hex');
  },
};
