/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const glob = require('fast-glob');
const path = require('path');
const { createHash } = require('./hash');
const { Package } = require('./Package');

const PREVIOUS_WORKSPACE_PATH = path.resolve(
  __dirname,
  '..',
  'previous-workspace-version.json'
);

async function commit(workspace) {
  await fs.writeJson(PREVIOUS_WORKSPACE_PATH, workspace);
}

async function loadPreviousVersion() {
  if (fs.existsSync(PREVIOUS_WORKSPACE_PATH)) {
    return fs.readJson(PREVIOUS_WORKSPACE_PATH);
  }
  return null;
}

function getPackageId(name, version) {
  return createHash(`${name}:${version}`);
}

async function get(rootDirectory) {
  const packageJson = await fs.readJson(
    path.join(rootDirectory, 'package.json')
  );
  const workspaces = packageJson.workspaces.packages.map((pkg) => {
    return `${pkg}/package.json`;
  });
  const packages = await glob(workspaces, {
    cwd: rootDirectory,
  }).then((matches) => {
    return Promise.all(
      matches.map(async (match) => {
        const packageJsonPath = path.join(rootDirectory, match);
        const packageJson = await fs.readJson(packageJsonPath);
        const directory = path.dirname(packageJsonPath);
        const info = Package.getPackageInfo(packageJson);
        const tree = await getFileTree(directory);

        return {
          id: getPackageId(info.name, info.version),
          directory,
          info,
          tree,
        };
      })
    );
  });

  const workspace = {
    id: createHash(rootDirectory),
    type: 'workspace',
    children: packages,
    hash: createHash(
      ...packages.map((pkg) => {
        return pkg.tree.hash;
      })
    ),
  };

  return workspace;
}

const ignoreList = [
  'node_modules',
  'es',
  'lib',
  'umd',
  '.DS_Store',
  'build',
  'storybook-static',
];

async function getFileTree(filepath) {
  const stats = await fs.stat(filepath);
  const shouldBeIgnored = ignoreList.some((partialPath) => {
    return filepath.split('/').includes(partialPath);
  });

  if (shouldBeIgnored) {
    return null;
  }

  if (!stats.isDirectory()) {
    return {
      id: createHash(filepath),
      filepath,
      type: 'file',
      hash: createHash(await fs.readFile(filepath)),
    };
  }

  const children = await fs
    .readdir(filepath)
    .then((filepaths) => {
      return Promise.all(
        filepaths.map((childFilepath) => {
          return getFileTree(path.join(filepath, childFilepath));
        })
      );
    })
    .then((results) => {
      return results.filter(Boolean);
    });

  return {
    id: createHash(filepath),
    filepath,
    type: 'directory',
    children,
    hash: createHash(...children.map((child) => child.hash)),
  };
}

module.exports = {
  commit,
  get,
  loadPreviousVersion,
  getPackageId,
};
