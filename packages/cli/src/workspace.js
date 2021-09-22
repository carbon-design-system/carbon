/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const execa = require('execa');
const fs = require('fs-extra');
const glob = require('fast-glob');
const path = require('path');
const packageJson = require('../../../package.json');

const WORKSPACE_ROOT = path.resolve(__dirname, '../../../');
const packagePaths = glob
  .sync(packageJson.workspaces.map((pattern) => `${pattern}/package.json`))
  .map((match) => {
    const packageJsonPath = path.join(WORKSPACE_ROOT, match);
    return {
      packageJsonPath,
      packageJson: fs.readJsonSync(packageJsonPath),
      packagePath: path.dirname(packageJsonPath),
      packageFolder: path.relative(
        WORKSPACE_ROOT,
        path.dirname(packageJsonPath)
      ),
    };
  });

const env = {
  root: {
    directory: WORKSPACE_ROOT,
    packageJson,
  },
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
  return JSON.parse(lernaListOutput).filter((pkg) => !pkg.private);
}

module.exports = {
  workspace,
  getPackages,
};
