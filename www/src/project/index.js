/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'fs-extra';
import glob from 'fast-glob';
import path from 'path';
import semver from 'semver';
import { hash } from '../crypto/murmur';

let defaultDirectory = process.cwd();
let _project = null;

export async function get(directory = defaultDirectory) {
  if (!_project) {
    _project = await Project.detect(directory);
  }
  return _project;
}

class Project {
  /**
   * Detects the project root directory from a given current working directory
   * @param {string} directory
   * @returns Promise<Project>
   */
  static async detect(directory) {
    const rootDirectory = getProjectRoot(directory);
    const workspace = await Workspace.load(rootDirectory);
    return Project.create(rootDirectory, workspace);
  }

  static create(directory, workspace) {
    return new Project(directory, workspace);
  }

  constructor(directory, workspace) {
    this.directory = directory;
    this.workspace = workspace;
  }

  get workspaces() {
    return [this.workspace, ...this.workspace.getWorkspaces()];
  }

  findWorkspace(name) {
    const workspaces = this.workspaces;
    return workspaces.find((workspace) => {
      return workspace.name === name;
    });
  }

  findWorkspaceById(id) {
    const workspaces = this.workspaces;

    return workspaces.find((workspace) => {
      return workspace.id === id;
    });
  }
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

const { root: ROOT_DIR } = path.parse(__dirname);

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

class Workspace {
  /**
   * @param {string} directory
   * @returns {object}
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

      node.workspaces.forEach((node) => {
        const child = visit(node);
        workspace.addChildWorkspace(child);
      });

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
}

async function loadWorkspace(directory) {
  const packageJsonPath = path.join(directory, 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    throw new Error(`Unable to find package.json at ${packageJsonPath}`);
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
      throw new Error(
        `Invalid workspace configuration found at ${packageJsonPath}`
      );
    }

    const patterns = Array.isArray(packageJson.workspaces)
      ? packageJson.workspaces
      : packageJson.workspaces.packages;
    const children = await glob(
      patterns.map((pattern) => path.join(pattern, 'package.json')),
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
      directory,
      dependencies,
      name: packageJson.name,
      version: packageJson.version,
      workspaces: children,
    };
  }

  return {
    directory,
    dependencies,
    name: packageJson.name,
    version: packageJson.version,
    workspaces: [],
  };
}

export { Project };
