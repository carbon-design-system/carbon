/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'fs-extra';
import { nanoid } from 'nanoid';
import os from 'os';
import path from 'path';

const directories = new Set();

const TempDir = {
  /**
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
   * @returns {string}
   */
  getTempDir() {
    return os.tmpdir();
  },
};

class TempWorkspace {
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

  getDirectory() {
    return this.directory;
  }

  async set(key, value) {
    this.packageJson = {
      ...this.packageJson,
      [key]: value,
    };
    await fs.writeJson(this.packageJsonPath, this.packageJson);
  }
}

afterEach(async () => {
  await TempDir.clear();
});

// One workspace
// Monorepo
//   -> Ran from root
//   -> Ran from workspace

// Situations
//
// carbon-components
//
//
// carbon-components
// carbon-components-react
// carbon-icons
//
//
// carbon-components
// carbon-components-react
// carbon-icons
// @carbon/icons-react
//
// No upgrades available
// Upgrades available

const Options = {
  default: {
    cwd: TempDir.getTempDir(),
    verbose: false,
    write: false,
  },
  with(cwd) {
    return {
      ...Options.default,
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
    //
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

    inquirer.mockAnswer('workspace', child.getDirectory());
    inquirer.mockAnswer('confirm', true);
    await upgrade(Options.with(child.getDirectory()), [
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
  });

  test('multiple workspaces, select root, workspaces have upgrades', async () => {
    //
  });
});
