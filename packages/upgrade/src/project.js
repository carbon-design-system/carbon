/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const { UpgradeError } = require('./error');

async function findPackageJson(folder) {
  let currentDirectory = folder;

  while (path.dirname(currentDirectory) !== '/' && currentDirectory !== '/') {
    const packageJsonPath = path.join(currentDirectory, 'package.json');
    if (await fs.pathExists(packageJsonPath)) {
      break;
    }
    currentDirectory = path.dirname(currentDirectory);
  }

  if (path.dirname(currentDirectory) === '/' && currentDirectory === '/') {
    throw new UpgradeError(
      `Unable to find a \`package.json\` file in ${folder}`
    );
  }

  return path.join(currentDirectory, 'package.json');
}

module.exports = {
  findPackageJson,
};
