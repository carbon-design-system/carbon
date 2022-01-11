/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'fs-extra';
import glob from 'fast-glob';
import merge from 'lodash.merge';
import path from 'path';
import semver from 'semver';
import { UpgradeError } from './error';
import { hash } from './hash';

class Workspace {
  /**
   * @param {string} directory
   * @returns {Promise<Workspace>}
   */
  static async load(directory) {
    const tree = await loadWorkspace(directory);
    const visited = new Map();
    const workspace = visit(tree);

    function visit(node) {
      let workspace = Workspace.create(node);

      if (visited.has(workspace.id)) {
        return visited.get(workspace.id);
      }

      visited.set(workspace.id, workspace);

      if (node.type === 'worktree') {
        node.children.forEach((node) => {
          const child = visit(node);
          workspace.addChildWorkspace(child);
        });
      }

      return workspace;
    }

    for (const node of visited.values()) {
      for (const dependency of node.dependencies.values()) {
        if (!visited.has(dependency.name)) {
          continue;
        }
        const workspace = visited.get(dependency.name);
        if (semver.satisfies(workspace.version, dependency.version)) {
          dependency.workspace = workspace;
        }
      }
    }

    return workspace;
  }

  static create(workspace) {
    return new Workspace(workspace);
  }

  constructor({ directory, name, version, dependencies }) {
    this.directory = directory;
    this.name = name;
    this.version = version;
    this.dependencies = dependencies;
    this.workspaces = new Set();
    this.id = hash(this.directory);
  }

  addChildWorkspace(workspace) {
    this.workspaces.add(workspace);
  }

  getWorkspaces() {
    return Array.from(this.workspaces).flatMap((workspace) => {
      return [workspace, ...workspace.getWorkspaces()];
    });
  }

  getPackageJson() {
    return fs.readJson(this.getPackageJsonPath());
  }

  getPackageJsonPath() {
    return path.join(this.directory, 'package.json');
  }

  async updatePackageJson(packageJson) {
    const packageJsonPath = path.join(this.directory, 'package.json');
    const current = await this.getPackageJson();
    await fs.writeJson(packageJsonPath, merge(current, packageJson), {
      spaces: 2,
    });
  }
}

async function loadWorkspace(directory) {
  const packageJsonPath = path.join(directory, 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    throw new UpgradeError(`Unable to find package.json at ${packageJsonPath}`);
  }

  const packageJson = await fs.readJson(packageJsonPath);
  const types = ['dependencies', 'devDependencies', 'peerDependencies'];
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

const { root: ROOT_DIR } = path.parse(__dirname);

/**
 * Returns an array of the the directory and its ancestors
 * @param {string} directory
 * @returns {Array<string>}
 */
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

function getAvailableWorkspaces(directory) {
  return ancestors(directory).filter((directory) => {
    return fs.existsSync(path.join(directory, 'package.json'));
  });
}

export { Workspace, getAvailableWorkspaces };
