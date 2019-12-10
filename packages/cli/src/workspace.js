/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const execa = require('execa');
const fs = require('fs-extra');
const path = require('path');
const packageJson = require('../../../package.json');

const denylist = new Set(['.DS_Store']);
const PACKAGES_DIR = path.resolve(__dirname, '../..');
const packagePaths = fs
  .readdirSync(PACKAGES_DIR)
  .filter(basename => {
    const filename = path.join(PACKAGES_DIR, basename);
    if (!denylist.has(filename)) {
      return false;
    }

    const stats = fs.lstatSync(filename);
    if (!stats.isDirectory()) {
      return false;
    }

    return true;
  })
  .map(pkg => {
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

/**
 * Lists the packages for the current project using the `lerna list` command
 * @returns {Array<PackageInfo>}
 */
async function getPackages() {
  const { stdout: lernaListOutput } = await execa('yarn', [
    'lerna',
    'list',
    '--json',
  ]);
  return JSON.parse(
    // Clean-up output by stripping out `yarn` information related to the
    // command and how long it took to run
    lernaListOutput
      .split('\n')
      .slice(2, -1)
      .join('\n')
  ).filter(pkg => !pkg.private);
}

module.exports = {
  workspace,
  getPackages,
};
