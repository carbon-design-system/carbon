/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'fs-extra';
import { nanoid } from 'nanoid';
import os from 'os';
import path from 'path';

const directories = new Set();

/**
 * Helper for creating and clearing temporary directories in a filesystem.
 * Useful for simulating projects in test files.
 */
const TempDir = {
  /**
   * Create a temporary directory
   * @returns {Promise<string>}
   */
  async create() {
    const root = TempDir.getTempDir();
    const id = nanoid();
    const directory = path.join(root, id);

    await fs.ensureDir(directory);

    directories.add(directory);

    return directory;
  },

  /**
   * Remove all temporary directories that have been created
   * @returns {Promise<void>}
   */
  async clear() {
    await Promise.all(
      Array.from(directories).map((directory) => {
        return fs.remove(directory);
      })
    );
    directories.clear();
  },

  /**
   * Get the tmp directory as reported by OS
   * @returns {string}
   */
  getTempDir() {
    return os.tmpdir();
  },
};

/**
 * Helper class for managing workspaces in a test environment. Workspaces are
 * created in temporary directories and will commit files to the filesystem.
 * This also abstracts adding child workspaces for monorepo sets to help with
 * testing different project setups.
 */
class TempWorkspace {
  /**
   * @param {object} config
   * @param {string} [config.directory]
   * @param {object} config.packageJson
   * @returns {Promise<TempWorkspace>}
   */
  static async create({ directory, packageJson }) {
    const root = directory || (await TempDir.create());
    const packageJsonPath = path.join(root, 'package.json');
    await fs.ensureDir(root);
    await fs.writeJson(packageJsonPath, packageJson);
    return new TempWorkspace(root, packageJson);
  }

  constructor(directory, packageJson) {
    this.directory = directory;
    this.packageJson = packageJson;
    this.packageJsonPath = path.join(this.directory, 'package.json');
  }

  /**
   * Add a child workspace to the existing workspace with a given packageJson
   * @param {object} config
   * @param {object} config.packageJson
   * @returns {Promise<Workspace>}
   */
  async addChildWorkspace({ packageJson }) {
    if (!this.workspaces) {
      this.workspaces = new Set();
      this.workspaceDirectory = path.join(this.directory, 'packages');
      await fs.ensureDir(this.workspaceDirectory);
      await this.set('workspaces', ['packages/*']);
    }

    const workspace = await TempWorkspace.create({
      directory: path.join(this.workspaceDirectory, packageJson.name),
      packageJson,
    });

    this.workspaces.add(workspace);

    return workspace;
  }

  /**
   * Get the directory containing this workspace
   * @returns {string}
   */
  getDirectory() {
    return this.directory;
  }

  /**
   * Set a specific value in the package.json file for a workspace
   * @returns {Promise<void>}
   */
  async set(key, value) {
    this.packageJson = {
      ...this.packageJson,
      [key]: value,
    };
    await fs.writeJson(this.packageJsonPath, this.packageJson);
  }

  async getPackageJson() {
    return await fs.readJson(this.packageJsonPath);
  }
}

/**
 * Provide default and customizable options to pass to commands. These emulate
 * what this command is expected to receive from a CLI
 */
const Options = {
  default: {
    cwd: TempDir.getTempDir(),
    verbose: false,
    write: false,
  },

  /**
   * Returns an options object with the given cwd set
   * @param {string} cwd
   * @returns {object}
   */
  with(cwd, options = {}) {
    return {
      ...Options.default,
      ...options,
      cwd,
    };
  },
};

describe('commands/upgrade', () => {
  let inquirer;
  let logger;
  let upgrade;

  beforeEach(() => {
    jest.mock('inquirer');
    jest.mock('../../logger');
    inquirer = require('inquirer');
    logger = require('../../logger').logger;
    upgrade = require('../upgrade').upgrade;
  });

  afterEach(async () => {
    await TempDir.clear();
  });

  test('no workspace', async () => {
    await expect(
      upgrade(Options.default)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Unable to find a workspace to upgrade"`
    );
  });

  test('single workspace with no upgrades available', async () => {
    const workspace = await TempWorkspace.create({
      packageJson: {
        name: 'test',
      },
    });
    await upgrade(Options.with(workspace.getDirectory()));
    expect(logger.info).toHaveBeenCalledWith('No upgrades available');
  });

  test('single workspace with upgrade available', async () => {
    const workspace = await TempWorkspace.create({
      packageJson: {
        name: 'test',
        dependencies: {
          'test-dependency': '1.0.0',
        },
      },
    });
    const options = Options.with(workspace.getDirectory(), {
      write: true,
    });

    inquirer.mockAnswer('confirm', true);

    await upgrade(options, [
      {
        name: 'test-upgrade',
        updates: [
          {
            package: {
              name: 'test-dependency',
              range: '1.x',
            },
            changes: [
              {
                type: 'uninstall',
              },
            ],
          },
        ],
      },
    ]);

    await expect(workspace.getPackageJson()).resolves.toEqual({
      name: 'test',
      dependencies: {},
    });
  });

  test('single workspace with upgrades available', async () => {
    const workspace = await TempWorkspace.create({
      packageJson: {
        name: 'test',
        dependencies: {
          'test-dependency-a': '1.0.0',
          'test-dependency-b': '2.0.0',
        },
      },
    });
    const options = Options.with(workspace.getDirectory(), {
      write: true,
    });

    inquirer.mockAnswer('upgrade', 'two-dependencies');

    await upgrade(options, [
      {
        name: 'one-dependency',
        updates: [
          {
            package: {
              name: 'test-dependency-a',
              range: '1.x',
            },
            changes: [
              {
                type: 'uninstall',
              },
            ],
          },
        ],
      },
      {
        name: 'two-dependencies',
        updates: [
          {
            package: {
              name: 'test-dependency-a',
              range: '1.x',
            },
            changes: [
              {
                type: 'uninstall',
              },
            ],
          },
          {
            package: {
              name: 'test-dependency-b',
              range: '2.x',
            },
            changes: [
              {
                type: 'uninstall',
              },
            ],
          },
        ],
      },
    ]);

    await expect(workspace.getPackageJson()).resolves.toEqual({
      name: 'test',
      dependencies: {},
    });
  });

  test('multiple workspaces, select one with no upgrades available', async () => {
    const workspace = await TempWorkspace.create({
      packageJson: {
        name: 'root',
      },
    });
    const child = await workspace.addChildWorkspace({
      packageJson: {
        name: 'a',
        version: '0.0.0',
      },
    });

    inquirer.mockAnswer('workspace', child.getDirectory());
    await upgrade(Options.with(child.getDirectory()));
    expect(logger.info).toHaveBeenCalledWith('No upgrades available');
  });

  test('multiple workspaces, select one with upgrades available', async () => {
    const workspace = await TempWorkspace.create({
      packageJson: {
        name: 'root',
      },
    });
    const child = await workspace.addChildWorkspace({
      packageJson: {
        name: 'a',
        version: '0.0.0',
        dependencies: {
          'test-upgrade': '0.1.0',
        },
      },
    });
    const options = Options.with(child.getDirectory(), {
      write: true,
    });

    inquirer.mockAnswer('workspace', child.getDirectory());
    inquirer.mockAnswer('confirm', true);
    await upgrade(options, [
      {
        name: 'test-upgrade',
        updates: [
          {
            package: {
              name: 'test-upgrade',
              range: '0.1.0',
            },
            changes: [
              {
                type: 'update',
                package: {
                  version: '0.2.0',
                },
              },
            ],
          },
        ],
      },
    ]);
    await expect(child.getPackageJson()).resolves.toEqual({
      name: 'a',
      version: '0.0.0',
      dependencies: {
        'test-upgrade': '0.2.0',
      },
    });
  });

  describe('changes', () => {
    test('install', async () => {
      const workspace = await TempWorkspace.create({
        packageJson: {
          name: 'test',
          dependencies: {
            'test-dependency': '1.0.0',
          },
        },
      });
      const options = Options.with(workspace.getDirectory(), {
        write: true,
      });

      inquirer.mockAnswer('confirm', true);

      await upgrade(options, [
        {
          name: 'test-upgrade',
          updates: [
            {
              package: {
                name: 'test-dependency',
                range: '1.x',
              },
              changes: [
                {
                  type: 'install',
                  package: {
                    name: 'new-dependency',
                    version: '1.0.0',
                  },
                },
              ],
            },
          ],
        },
      ]);
      await expect(workspace.getPackageJson()).resolves.toEqual({
        name: 'test',
        dependencies: {
          'test-dependency': '1.0.0',
          'new-dependency': '1.0.0',
        },
      });
    });

    test('uninstall', async () => {
      const workspace = await TempWorkspace.create({
        packageJson: {
          name: 'test',
          dependencies: {
            'test-dependency': '1.0.0',
          },
        },
      });
      const options = Options.with(workspace.getDirectory(), {
        write: true,
      });

      inquirer.mockAnswer('confirm', true);

      await upgrade(options, [
        {
          name: 'test-upgrade',
          updates: [
            {
              package: {
                name: 'test-dependency',
                range: '1.x',
              },
              changes: [
                {
                  type: 'uninstall',
                },
              ],
            },
          ],
        },
      ]);
      await expect(workspace.getPackageJson()).resolves.toEqual({
        name: 'test',
        dependencies: {},
      });
    });

    test('update', async () => {
      const workspace = await TempWorkspace.create({
        packageJson: {
          name: 'test',
          dependencies: {
            'test-dependency': '1.0.0',
          },
        },
      });
      const options = Options.with(workspace.getDirectory(), {
        write: true,
      });

      inquirer.mockAnswer('confirm', true);

      await upgrade(options, [
        {
          name: 'test-upgrade',
          updates: [
            {
              package: {
                name: 'test-dependency',
                range: '1.x',
              },
              changes: [
                {
                  type: 'update',
                  package: {
                    version: '2.0.0',
                  },
                },
              ],
            },
          ],
        },
      ]);
      await expect(workspace.getPackageJson()).resolves.toEqual({
        name: 'test',
        dependencies: {
          'test-dependency': '2.0.0',
        },
      });
    });
  });
});
