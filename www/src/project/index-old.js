/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as babel from '@babel/core';
import traverse from '@babel/traverse';
import fs from 'fs-extra';
import glob from 'fast-glob';
import path from 'path';
import resolve from 'resolve';
import semver from 'semver';
import { hash } from '../crypto/murmur';
import { analyze } from './analyze';

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

  async getPackageField(key) {
    const packageJsonPath = path.join(this.directory, 'package.json');
    const packageJson = await fs.readJson(packageJsonPath);
    return packageJson[key];
  }

  async getPackageExports() {
    const candidates = [
      {
        filepath: 'src/index.js',
        type: 'javascript',
      },
      // {
      // directory: 'scss',
      // type: 'scss',
      // },
    ];
    const entrypoints = candidates.filter(({ directory, filepath }) => {
      if (directory) {
        return fs.existsSync(path.join(this.directory, directory));
      }
      if (filepath) {
        return fs.existsSync(path.join(this.directory, filepath));
      }
      return false;
    });
    const exports = await Promise.all(
      entrypoints.map(async (info) => {
        const details = {
          type: info.type,
        };

        if (info.directory) {
          details.directory = path.join(this.directory, info.directory);
        }

        if (info.filepath) {
          details.filepath = path.join(this.directory, info.filepath);
        }

        return await analyze(details);
      })
    ).then((results) => {
      const exports = {};

      for (const result of results) {
        for (const [key, value] of Object.entries(result)) {
          exports[key] = value;
        }
      }

      return exports;
    });

    return exports;
  }

  async getFiles() {
    const candidates = ['src', 'scss'].map((candidate) => {
      return path.join(this.directory, candidate);
    });

    const files = new Map();
    const visited = new Set();
    const queue = candidates.filter((candidate) => {
      return fs.existsSync(candidate);
    });
    const ignorelist = [
      '__tests__',
      '__mocks__',
      '-test.js',
      '-test.e2e.js',
      '.stories.js',
      '-story.js',
      'stories',
      '.md',
      '.mdx',
      'template',
    ];

    while (queue.length !== 0) {
      const filepath = queue.shift();
      if (visited.has(filepath)) {
        continue;
      }

      visited.add(filepath);

      // TODO: how to exclude scss files if project is JS-based?
      // TODO: make this glob based instead of matching on sub-path
      if (ignorelist.some((pattern) => filepath.includes(pattern))) {
        continue;
      }

      const stats = await fs.stat(filepath);
      if (stats.isDirectory()) {
        const files = await fs.readdir(filepath).then((filepaths) => {
          return filepaths.map((childPath) => {
            return path.join(filepath, childPath);
          });
        });
        queue.push(...files);
        continue;
      }

      if (path.extname(filepath) === '.js') {
        const id = hash(filepath);
        const contents = await fs.readFile(filepath, 'utf8');
        const ast = babel.parseSync(contents, {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-export-default-from'],
        });
        const imports = new Set();
        const exports = new Set();

        traverse(ast, {
          ExportAllDeclaration() {
            // unsupported
          },
          ExportDefaultDeclaration() {
            exports.add('default');
          },
          ExportNamedDeclaration({ node }) {
            for (const specifier of node.specifiers) {
              exports.add(specifier.exported.name);
            }
          },
          ImportDeclaration({ node }) {
            const source = node.source.value;
            if (source.startsWith('.')) {
              const resolved = resolve.sync(source, {
                basedir: path.dirname(filepath),
              });
              imports.add(hash(resolved));
              queue.push(resolved);
            } else {
              // imports.add(source);
            }
          },
        });

        files.set(id, {
          id,
          filepath,
          imports,
          exports,
        });
      }

      if (path.extname(filepath) === '.scss') {
        const id = hash(filepath);
        // const contents = await fs.readFile(filepath, 'utf8');

        files.set(id, {
          id,
          filepath,
          imports: [],
          exports: [],
        });
      }
    }

    return Array.from(files.values());
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
