/**
 * Copyright IBM Corp. 2018, 2023
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
const { root: ROOT_DIR } = path.parse(__dirname);

/**
 * Returns an array of the the directory and its ancestors
 * @param {string} directory
 * @returns {Array<string>}
 */
function ancestors(directory) {
  const result = [directory];
  let current = directory;

  while (current !== '') {
    result.push(current);

    if (current !== ROOT_DIR) {
      current = path.dirname(current);
    } else {
      current = '';
    }
  }

  return result;
}

module.exports = {
  process(_file, filepath) {
    const nodeModules = ancestors(path.dirname(filepath))
      .map((directory) => {
        return path.join(directory, 'node_modules');
      })
      .filter((directory) => {
        return fs.existsSync(directory);
      });

    const result = sass.renderSync({
      file: filepath,
      outputStyle: 'compressed',
      includePaths: [...nodeModules],
    });
    return {
      code: `
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
      `,
    };
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
