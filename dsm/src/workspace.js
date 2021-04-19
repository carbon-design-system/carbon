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

const SNAPSHOT_PATH = path.resolve(__dirname, '..', 'snapshot.json');
const version = '0.1';
const Workspace = {
  clearSnapshot,
  snapshot,
  loadSnapshot,
  get,
  getPackageId,
  getChangedPackages,
};

async function clearSnapshot() {
  if (fs.existsSync(SNAPSHOT_PATH)) {
    await fs.remove(SNAPSHOT_PATH);
  }
}

async function snapshot(workspace) {
  await fs.writeJson(SNAPSHOT_PATH, {
    version: '0.1',
    workspace,
  });
}

async function loadSnapshot() {
  if (fs.existsSync(SNAPSHOT_PATH)) {
    return fs.readJson(SNAPSHOT_PATH);
  }
  return null;
}

function getPackageId(name, version) {
  return createHash(`${name}:${version}`);
}

async function get(cwd) {
  const rootDirectory = await getWorkspaceRoot(cwd);
  const packageJson = await fs.readJson(
    path.join(rootDirectory, 'package.json')
  );
  const workspaces = packageJson.workspaces.packages.map((pkg) => {
    return `${pkg}/package.json`;
  });
  const matches = await glob(workspaces, {
    cwd: rootDirectory,
  });
  const packages = await Promise.all(
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
        files: tree,
        type: 'package',
      };
    })
  );

  const workspace = {
    id: createHash(rootDirectory),
    directory: rootDirectory,
    type: 'workspace',
    hash: createHash(
      ...packages.map((pkg) => {
        return pkg.files.hash;
      })
    ),
    packages,
  };

  return workspace;
}

const { root: OS_ROOT_DIR } = path.parse(process.cwd());

async function getWorkspaceRoot(directory) {
  const packageJsonPath = path.join(directory, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    const parent = path.dirname(directory);
    if (parent === OS_ROOT_DIR && directory === OS_ROOT_DIR) {
      throw new Error('Unable to find workspace root');
    }
    return getWorkspaceRoot(parent);
  }

  const packageJson = await fs.readJson(packageJsonPath);
  if (packageJson.workspaces) {
    return directory;
  }

  const parent = path.dirname(directory);
  if (parent === OS_ROOT_DIR && directory === OS_ROOT_DIR) {
    throw new Error('Unable to find workspace root');
  }
  return getWorkspaceRoot(parent);
}

const ignoreList = [
  'node_modules',
  'es',
  'lib',
  'umd',
  '.DS_Store',
  'build',
  'storybook-static',
  'previous-workspace-version.json',
  '.incremental-cache',
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

async function getChangedPackages(workspace) {
  const snapshot = await loadSnapshot();
  if (!snapshot) {
    return workspace.packages.map((pkg) => {
      return pkg.id;
    });
  }

  if (snapshot.version !== version) {
    return workspace.packages.map((pkg) => {
      return pkg.id;
    });
  }

  const { workspace: old } = snapshot;
  if (old.hash === workspace.hash) {
    return [];
  }

  return diff(old, workspace);
}

function diff(o, n) {
  if (o.type !== n.type) {
    throw new Error(
      `Invariant: objects being compared should be of the same type, ` +
        `instead received: ${o.type} (old), ${n.type} (new)`
    );
  }

  if (n.type === 'workspace') {
    const changes = [];

    for (const pkg of n.packages) {
      const oldPackage = o.packages.find((oldPackage) => {
        return oldPackage.id === pkg.id;
      });

      if (!oldPackage) {
        const change = {
          type: 'added',
          object: {
            id: pkg.id,
            directory: pkg.directory,
            info: pkg.info,
            type: 'package',
          },
        };
        changes.push(change);
        continue;
      }

      if (oldPackage.files.hash !== pkg.files.hash) {
        const change = {
          type: 'modified',
          object: {
            id: pkg.id,
            directory: pkg.directory,
            info: pkg.info,
            type: 'package',
            changes: diff(oldPackage, pkg),
          },
        };
        changes.push(change);
      }
    }

    for (const pkg of o.packages) {
      const existingPackage = n.packages.find((existingPackage) => {
        return existingPackage.id === pkg.id;
      });

      if (!existingPackage) {
        const change = {
          type: 'removed',
          object: {
            id: pkg.id,
            directory: pkg.directory,
            info: pkg.info,
            type: 'package',
          },
        };
        changes.push(change);
      }
    }

    return changes;
  }

  if (n.type === 'package') {
    const changes = [];

    for (const file of n.files.children) {
      const old = o.files.children.find((old) => {
        return old.id === file.id;
      });

      if (!old) {
        const change = {
          type: 'created',
          object: {
            type: file.type,
            id: file.id,
            filepath: file.filepath,
          },
        };
        changes.push(change);
        continue;
      }

      if (old.hash === file.hash) {
        continue;
      }

      if (old.type !== file.type) {
        const change = {
          type: 'modified',
          object: {
            type: file.type,
            id: file.id,
            filepath: file.filepath,
          },
        };
        changes.push(change);
        continue;
      }

      if (file.type === 'file') {
        const change = {
          type: 'modified',
          object: {
            type: file.type,
            id: file.id,
            filepath: file.filepath,
          },
        };
        changes.push(change);
        continue;
      }

      if (file.type === 'directory') {
        const change = {
          type: 'modified',
          object: {
            type: file.type,
            id: file.id,
            filepath: file.filepath,
            changes: diff(old, file),
          },
        };
        changes.push(change);
        continue;
      }

      throw new Error(
        `Unsupported comparison in package for type: ${file.type}`
      );
    }

    return changes;
  }

  if (n.type === 'directory') {
    const changes = [];

    for (const file of n.children) {
      const old = o.children.find((old) => {
        return old.id === file.id;
      });

      if (!old) {
        const change = {
          type: 'created',
          object: {
            type: file.type,
            id: file.id,
            filepath: file.filepath,
          },
        };
        changes.push(change);
        continue;
      }

      if (old.hash === file.hash) {
        continue;
      }

      const change = {
        type: 'modified',
        object: {
          type: file.type,
          id: file.id,
          filepath: file.filepath,
        },
      };

      if (file.type === 'directory') {
        change.object.changes = diff(old, file);
      }

      changes.push(change);
    }

    for (const file of o.children) {
      const match = n.children.find((match) => {
        return match.id === file.id;
      });

      if (!match) {
        const change = {
          type: 'removed',
          object: {
            type: file.type,
            id: file.id,
            filepath: file.filepath,
          },
        };
        changes.push(change);
      }
    }

    return changes;
  }

  throw new Error(`Unable to diff object of type: \`${n.type}\``);
}

module.exports = {
  Workspace,
};
