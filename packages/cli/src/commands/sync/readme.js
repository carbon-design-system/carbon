/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const prettier = require('prettier');
const prettierConfig = require('prettier-config-carbon');
const createRemark = require('remark');
const monorepo = require('./remark/remark-monorepo');

const packageDenyList = new Set([
  'carbon-components',
  'carbon-components-react',
  '@carbon/react',
  '@carbon/sketch',
  '@carbon/styles',
]);

function run({ root, packagePaths }) {
  const remark = createRemark().use(monorepo, {
    root: root.directory,
  });
  const prettierOptions = {
    ...prettierConfig,
    parser: 'markdown',
  };

  return Promise.all(
    packagePaths
      .filter((pkg) => !packageDenyList.has(pkg.packageJson.name))
      .map(async ({ packagePath }) => {
        const README_PATH = path.join(packagePath, 'README.md');
        if (!(await fs.pathExists(README_PATH))) {
          return;
        }

        const readme = await fs.readFile(README_PATH, 'utf8');
        const file = await process(remark, packagePath, readme);
        await fs.writeFile(
          README_PATH,
          prettier.format(String(file), prettierOptions)
        );
      })
  );
}

function process(remark, cwd, contents) {
  return new Promise((resolve, reject) => {
    remark.process({ cwd, contents }, (error, file) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(file);
    });
  });
}

module.exports = {
  name: 'readme',
  run,
};
