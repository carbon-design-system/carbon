/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import inquirer from 'inquirer';
import clone from 'lodash.clonedeep';
import semver from 'semver';
import { logger } from '../logger';
import { Workspace, getAvailableWorkspaces } from '../workspace';
import { UpgradeError } from '../error';
import { diff } from '../diff';

export async function upgrade(options, defaultUpgrades = []) {
  logger.verbose('running upgrade command with options: %o', options);

  const { cwd } = options;
  const workspaces = getAvailableWorkspaces(cwd);

  if (workspaces.length === 0) {
    throw new UpgradeError('Unable to find a workspace to upgrade');
  }

  const workspace = await getSelectedWorkspace(workspaces);

  logger.verbose('running from workspace: %s', workspace.directory);

  const upgrades = defaultUpgrades.filter((upgrade) => {
    logger.verbose('checking upgrade: %s', upgrade.name);

    return upgrade.updates.every((update) => {
      const dependency = workspace.dependencies.find((dependency) => {
        return dependency.name === update.package.name;
      });

      if (dependency) {
        return semver.intersects(update.package.range, dependency.version);
      }

      return false;
    });
  });

  if (upgrades.length === 0) {
    throw new UpgradeError('No upgrades available.');
  }

  const upgrade = await getSelectedUpgrade(upgrades);

  logger.info('running upgrade: %s', upgrade.name);

  const packageJson = PackageJson.create(await workspace.getPackageJson());

  for (const update of upgrade.updates) {
    logger.verbose('applying updates for package: %s', update.package.name);

    for (const change of update.changes) {
      logger.verbose('applying change: %s', change.type);
      if (change.type === 'update') {
        packageJson.update(update.package);
      }
    }
  }

  if (packageJson.changed) {
    const packageJsonPath = workspace.getPackageJsonPath();
    if (options.write) {
      logger.info('updating file: %s', packageJsonPath);
      await workspace.updatePackageJson(packageJson.getJSON());
    } else {
      logger.info('previewing changes for file: %s', packageJsonPath);
      logger.info(packageJson.diff());
    }
  }

  // TODO: children workspaces
}

/**
 * @param {Array<string>}
 * @returns {Promise<Workspace>}
 */
async function getSelectedWorkspace(workspaces) {
  // If only one workspace is available, we'll load that one by default
  if (workspaces.length === 1) {
    return await Workspace.load(workspaces[0]);
  }

  // If multiple workspaces are found, we'll prompt to see which one the user
  // would like us to operate off of.
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'workspace',
      message: 'What workspace would you like to use?',
      choices: workspaces,
    },
  ]);

  return await Workspace.load(answers.workspace);
}

/**
 * @param {Array<Upgrade>} upgrades
 * @returns {Promise<Upgrade | null>}
 */
async function getSelectedUpgrade(upgrades) {
  if (upgrades.length === 1) {
    const [upgrade] = upgrades;
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `Would you like to run the ${upgrade.name} upgrade?`,
      },
    ]);

    if (answers.confirm === false) {
      return null;
    }

    return upgrade;
  }

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'upgrade',
      message: 'Which upgrade would you like to run?',
      choices: upgrades.map((upgrade) => {
        return upgrade.name;
      }),
    },
  ]);

  return upgrades.find((upgrade) => {
    return upgrade.name === answers.name;
  });
}

class PackageJson {
  /**
   * @param {object} packageJson
   * @returns {PackageJson}
   */
  static create(packageJson) {
    return new PackageJson(packageJson);
  }

  static dependencyTypes = [
    'dependencies',
    'devDependencies',
    'peerDependencies',
  ];

  constructor(packageJson) {
    this.original = packageJson;
    this.modified = clone(this.original);
    this.changed = false;
  }

  update({ name, version }) {
    const type = PackageJson.dependencyTypes.find((type) => {
      return this.original[type][name];
    });

    if (type) {
      this.changed = true;
      this.modified[type][name] = version;
    } else {
      throw new Error(`Unable to find dependency type for: \`${name}\``);
    }
  }

  getJSON() {
    return this.modified;
  }

  diff() {
    return diff(
      JSON.stringify(this.original, null, 2),
      JSON.stringify(this.modified, null, 2)
    );
  }
}
