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

const { root: ROOT_DIR } = path.parse(__dirname);
const WORKSPACE_ROOT = getProjectRoot(__dirname);
const packageJson = fs.readJsonSync(path.join(WORKSPACE_ROOT, 'package.json'));
const packagePaths = Array.isArray(packageJson.workspaces)
  ? glob
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
      })
  : [];

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

/**
 * Returns the root directory of a project, either as a workspace root with a
 * collection of packages or a single project with a `package.json`
 * @param {string} directory
 * @returns {string}
 */
function getProjectRoot(directory) {
  const packageJsonPaths = ancestors(directory).filter((directory) => {
    return fs.existsSync(path.join(directory, 'package.json'));
  });

  const rootDirectory =
    packageJsonPaths.length > 0
      ? packageJsonPaths[packageJsonPaths.length - 1]
      : null;

  if (!rootDirectory) {
    throw new Error(
      `Unable to find a \`package.json\` file from directory: ${directory}`
    );
  }

  return rootDirectory;
}

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
  workspace,
  getPackages,
};
