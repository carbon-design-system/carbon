/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const crypto = require('crypto');
const fs = require('fs-extra');
const glob = require('fast-glob');
const path = require('path');
const semver = require('semver');

const _packages = new Map();
const Package = {
  create(name, version) {
    if (_packages.has(name)) {
      const versions = _packages.get(name);
      if (versions.has(version)) {
        return versions.get(version);
      }
    }

    const pkg = {
      name,
      version,
    };

    if (!_packages.has(name)) {
      _packages.set(name, new Map());
    }

    const versions = _packages.get(name);
    versions.set(version, pkg);

    return pkg;
  },
};

async function main() {
  const workspaceRoot = path.resolve(__dirname, '..', '..');
  const root = await fs.readJson(path.join(workspaceRoot, 'package.json'));
  const { workspaces } = root;
  const packages = await glob(
    workspaces.packages.map((pkg) => `${pkg}/package.json`),
    {
      cwd: workspaceRoot,
    }
  ).then((matches) => {
    return Promise.all(
      matches.map(async (match) => {
        const packageJsonPath = path.join(workspaceRoot, match);
        const packageJson = await fs.readJson(path.join(workspaceRoot, match));
        const directory = path.dirname(packageJsonPath);
        const tree = await walk(directory);
        return {
          ...tree,
          type: 'package',
          id: createHash(packageJson.name),
          name: packageJson.name,
          version: packageJson.version,
          scripts: Object.keys(packageJson.scripts || {}),
          dependencies: [
            ...Object.entries(packageJson.dependencies || {}).map(
              ([name, version]) => {
                return Package.create(name, semver.coerce(version).version);
              }
            ),
            ...Object.entries(packageJson.devDependencies || {}).map(
              ([name, version]) => {
                return Package.create(name, semver.coerce(version).version);
              }
            ),
            ...Object.entries(packageJson.peerDependencies || {}).map(
              ([name, version]) => {
                return Package.create(name, semver.coerce(version).version);
              }
            ),
          ],
        };
      })
    );
  });

  // const oldTreePath = path.resolve(__dirname, '..', 'old-tree.json');
  // const oldTree = await fs.readJson(oldTreePath);
  const workspace = {
    filepath: workspaceRoot,
    type: 'workspace',
    children: packages,
    hash: createHash(
      ...packages.map((pkg) => {
        return pkg.hash;
      })
    ),
  };

  const graph = new Map();

  for (const child of workspace.children) {
    const pkg = Package.create(child.name, child.version);
    graph.set(pkg, {
      id: child.id,
      dependencies: new Set(),
    });
  }

  for (const child of workspace.children) {
    const pkg = Package.create(child.name, child.version);
    const entry = graph.get(pkg);
    for (const dependency of child.dependencies) {
      if (dependency.name.startsWith('@carbon')) {
        console.log(dependency);
        console.log(graph.has(dependency));
      }
      if (graph.has(dependency)) {
        entry.dependencies.add(dependency);
      }
    }
  }

  console.log(graph);

  return;

  console.log(topological(graph));

  function topological(graph) {
    const order = [];
    const visited = new Set();
    const visiting = new Set();

    // DFS
    function visit(key) {
      if (visited.has(key)) {
        return;
      }

      if (visiting.has(key)) {
        throw new Error(`Cycle detected: ${key}, ${Array.from(visiting)}`);
      }

      console.log('Visiting: %s', key);

      visiting.add(key);

      const value = graph.get(key);

      for (const dependency of value.dependencies) {
        console.log('----------------- Dependency: %s', dependency);
        visit(dependency);
      }

      visiting.delete(key);
      visited.add(key);
      order.push(key);
    }

    for (const key of graph.keys()) {
      visit(key);
    }

    return order;
  }

  // const changes = diff(oldTree, tree);
  // console.log(JSON.stringify(changes, null, 2));

  // await fs.writeJson(oldTreePath, tree);
}

function diff(o, n) {
  if (o.hash === n.hash) {
    return false;
  }

  if (o.type !== n.type) {
    throw new Error(`Mismatched types: ${o.type} != ${n.type} `);
  }

  if (n.type === 'workspace') {
    const diffs = [];

    for (const pkg of n.children) {
      const oldPackage = o.children.find((oldPackage) => {
        return oldPackage.filepath === pkg.filepath;
      });

      if (!oldPackage) {
        diffs.push({
          id: pkg.filepath,
          type: 'created',
        });
        continue;
      }

      if (oldPackage.hash !== pkg.hash) {
        diffs.push({
          id: pkg.filepath,
          type: 'updated',
          changes: diff(oldPackage, pkg),
        });
      }
    }

    for (const pkg of o.children) {
      const newPackage = n.children.find((newPackage) => {
        return newPackage.filepath === pkg.filepath;
      });
      if (!newPackage) {
        diffs.push({
          id: pkg.filepath,
          type: 'removed',
        });
      }
    }

    return diffs;
  }

  if (n.type === 'package') {
    const diffs = [];

    for (const child of n.children) {
      const match = o.children.find((old) => {
        return old.filepath === child.filepath;
      });

      if (!match) {
        diffs.push({
          id: child.filepath,
          type: 'created',
        });
        continue;
      }

      if (match.hash !== child.hash) {
        if (child.type === 'file') {
          diffs.push({
            id: child.filepath,
            type: 'updated',
          });
        } else {
          diffs.push({
            id: child.filepath,
            type: 'updated',
            changes: diff(match, child),
          });
        }
      }
    }

    return diffs;
  }

  if (n.type === 'directory') {
    const diffs = [];

    for (const node of n.children) {
      const old = o.children.find((old) => {
        return old.filepath === node.filepath;
      });
      if (!old) {
        diffs.push({
          id: node.filepath,
          type: 'created',
        });
        continue;
      }

      if (node.hash !== old.hash) {
        diffs.push({
          id: node.filepath,
          type: 'updated',
        });
      }
    }

    return diffs;
  }

  if (n.type === 'file') {
    throw new Error('File is a leaf type that should not be compared directly');
  }

  throw new Error(`Unsupported type: ${n.type}`);
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

async function walk(filepath) {
  const stats = await fs.stat(filepath);
  const shouldBeIgnored = ignoreList.some((partialPath) => {
    return filepath.split('/').includes(partialPath);
  });

  if (shouldBeIgnored) {
    return null;
  }

  if (!stats.isDirectory()) {
    return {
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
          return walk(path.join(filepath, childFilepath));
        })
      );
    })
    .then((results) => {
      return results.filter(Boolean);
    });

  return {
    filepath,
    type: 'directory',
    children,
    hash: createHash(...children.map((child) => child.hash)),
  };
}

function createHash(...contents) {
  const value = crypto.createHash('sha256');
  for (const content of contents) {
    value.update(content);
  }
  return value.digest('base64');
}

main().catch((error) => {
  console.log(error);
  process.exit(1);
});
