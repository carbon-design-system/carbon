/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const packageJson = require('../../../package.json');

const PACKAGES_DIR = path.resolve(__dirname, '../..');
const packagePaths = fs.readdirSync(PACKAGES_DIR).map(pkg => {
  const packageJsonPath = path.join(PACKAGES_DIR, pkg, 'package.json');
  return {
    basename: pkg,
    packageJsonPath,
    packageJson: fs.readJsonSync(packageJsonPath),
    packagePath: path.join(PACKAGES_DIR, pkg),
  };
});

const env = {
  root: {
    directory: path.resolve(__dirname, '../../..'),
    packageJson,
  },
  packagesDir: PACKAGES_DIR,
  packagePaths,
};

function workspace(fn) {
  return (...args) => fn(...args, env);
}

module.exports = {
  workspace,
};
