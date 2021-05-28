/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const glob = require('fast-glob');
const path = require('path');
const semver = require('semver');
const { UpgradeError } = require('./error');

async function findProject(directory) {
  const packageJsonPaths = ancestors(directory).filter((directory) => {
    return fs.existsSync(path.join(directory, 'package.json'));
  });
  const rootDirectory =
    packageJsonPaths.length > 0
      ? packageJsonPaths[packageJsonPaths.length - 1]
      : null;

  if (!rootDirectory) {
    throw new UpgradeError(
      `Unable to find a \`package.json\` file from directory: ${directory}`
    );
  }

  const tree = await loadWorkspace(rootDirectory);
  const workspaces = new Map();

  function visit(node) {
    if (workspaces.has(node.name)) {
      return;
    }

    const dependencies = new Map();
    const entry = {
      directory: node.directory,
      name: node.name,
      version: node.version,
      type: node.type,
      dependencies,
    };
    workspaces.set(node.name, entry);

    for (const dependency of node.dependencies) {
      dependencies.set(dependency.name, {
        type: dependency.type,
        name: dependency.name,
        version: dependency.version,
      });
    }

    if (node.type === 'worktree') {
      node.children.forEach(visit);
    }
  }

  visit(tree);

  function link(graph) {
    for (const node of graph.values()) {
      for (const dependency of node.dependencies.values()) {
        if (!graph.has(dependency.name)) {
          continue;
        }

        const workspace = graph.get(dependency.name);
        if (semver.satisfies(workspace.version, dependency.version)) {
          dependency.workspace = workspace;
        }
      }
    }
  }

  link(workspaces);

  return Project.create(workspaces);
}

class Project {
  static detect() {
    //
  }

  static create(graph) {
    return new Project(
      Array.from(graph.values()).map((workspace) => {
        return Workspace.create(workspace);
      })
    );
  }

  constructor(workspaces) {
    this.workspaces = workspaces;
  }

  getWorkspaces() {
    return this.workspaces;
  }

  findDependency(name, range) {
    return this.workspaces.filter((workspace) => {
      return workspace.findDependency(name, range);
    });
  }
}

class Workspace {
  static create(workspace) {
    return new Workspace(workspace);
  }

  constructor({ directory, name, version, dependencies }) {
    this.directory = directory;
    this.name = name;
    this.version = version;
    this.dependencies = dependencies;
  }

  findDependency(name, version) {
    return Array.from(this.dependencies.values()).find((dependency) => {
      return (
        dependency.name === name &&
        semver.intersects(version, dependency.version)
      );
    });
  }
}

const { root: ROOT_DIR } = path.parse(__dirname);

function ancestors(directory) {
  const result = [];
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

async function loadWorkspace(directory) {
  const packageJsonPath = path.join(directory, 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    throw new UpgradeError(`Unable to find package.json at ${packageJsonPath}`);
  }

  const packageJson = await fs.readJson(packageJsonPath);
  const types = [
    'dependencies',
    'devDependencies',
    'peerDependencies',
    // 'resolutions',
  ];
  const dependencies = [];

  for (const type of types) {
    if (!packageJson[type]) {
      continue;
    }

    for (const [name, version] of Object.entries(packageJson[type])) {
      dependencies.push({
        type,
        name,
        version,
      });
    }
  }

  if (packageJson.workspaces) {
    if (
      !Array.isArray(packageJson.workspaces) &&
      !Array.isArray(packageJson.workspaces.packages)
    ) {
      throw new UpgradeError(
        `Invalid workspace configuration found at ${packageJsonPath}`
      );
    }

    const patterns = Array.isArray(packageJson.workspaces)
      ? packageJson.workspaces
      : packageJson.workspaces.packages;
    const children = await glob(
      patterns.map((pattern) => `${pattern}/package.json`),
      {
        cwd: directory,
      }
    ).then((matches) => {
      return Promise.all(
        matches.map((match) => {
          return loadWorkspace(path.dirname(path.join(directory, match)));
        })
      );
    });

    return {
      type: 'worktree',
      directory,
      dependencies,
      children,
      name: packageJson.name,
      version: packageJson.version,
    };
  }

  return {
    type: 'workspace',
    directory,
    dependencies,
    name: packageJson.name,
    version: packageJson.version,
  };
}

module.exports = {
  findProject,
};
