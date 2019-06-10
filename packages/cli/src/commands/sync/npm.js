/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');

const defaultIgnorePatterns = [
  '**/__mocks__/**',
  '**/__tests__/**',
  '**/examples/**',
  '**/tasks/**',
];

function run({ packagePaths }) {
  return Promise.all(
    packagePaths.map(async ({ packagePath }) => {
      const ignorePath = path.join(packagePath, '.npmignore');
      const ignorePatterns = defaultIgnorePatterns.slice();

      if (await fs.pathExists(ignorePath)) {
        const ignoreFile = await fs.readFile(ignorePath, 'utf8');
        const localIgnorePatterns = ignoreFile.split('\n').filter(pattern => {
          return ignorePatterns.indexOf(pattern) === -1;
        });

        ignorePatterns.push(...localIgnorePatterns);
      }

      await fs.writeFile(ignorePath, ignorePatterns.join('\n'));
    })
  );
}

module.exports = {
  name: 'npm',
  run,
};
