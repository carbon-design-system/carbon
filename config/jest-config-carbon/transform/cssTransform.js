/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { createHash } = require('crypto');
const fs = require('fs');
const sass = require('sass');
const path = require('path');

const THIS_FILE = fs.readFileSync(__filename);

module.exports = {
  process(_file, filepath) {
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
  getCacheKey(sourceText, sourcePath, transformOptions) {
    const { config, configString, instrument } = transformOptions;
    return createHash('md5')
      .update(THIS_FILE)
      .update('\0', 'utf8')
      .update(sourceText)
      .update('\0', 'utf8')
      .update(path.relative(config.rootDir, sourcePath))
      .update('\0', 'utf8')
      .update(configString)
      .update('\0', 'utf8')
      .update(instrument ? 'instrument' : '')
      .update('\0', 'utf8')
      .update(process.version)
      .update('\0', 'utf8')
      .update(sass.info)
      .digest('hex');
  },
};
