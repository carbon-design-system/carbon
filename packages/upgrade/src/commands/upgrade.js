/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import inquirer from 'inquirer';
import semver from 'semver';
import { UpgradeError } from '../error';
import { logger } from '../logger';
import { Workspace, getAvailableWorkspaces } from '../workspace';

export async function upgrade(options, availableUpgrades = []) {
  logger.verbose('running upgrade command with options: %o', options);

  const { cwd, write } = options;
  const workspaces = getAvailableWorkspaces(cwd);

  if (workspaces.length === 0) {
    throw new UpgradeError('Unable to find a workspace to upgrade');
  }

  const workspace = await getSelectedWorkspace(workspaces);
  const upgrades = availableUpgrades.filter((upgrade) => {
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
    logger.info('No upgrades available');
    return;
  }

  const upgrade = await getSelectedUpgrade(upgrades);
  if (!upgrade) {
    logger.info('No upgrade selected');
    return;
  }

  logger.verbose(
    'running upgrade: %s for workspace: %s',
    upgrade.name,
    workspace.directory
  );

  const packageJson = await workspace.getPackageJson();

  for (const update of upgrade.updates) {
    logger.verbose('applying updates for package: %s', update.package.name);

    for (const change of update.changes) {
      logger.verbose('applying change: %o', change);

      if (change.type === 'install') {
        packageJson.install(change.package);
      }

      if (change.type === 'update') {
        packageJson.update({
          name: update.package.name,
          version: change.package.version,
        });
      }

      if (change.type === 'uninstall') {
        packageJson.uninstall(update.package);
      }
    }
  }

  if (packageJson.changed) {
    const packageJsonPath = workspace.getPackageJsonPath();
    if (write) {
      logger.info('updating file: %s', packageJsonPath);
      await workspace.writePackageJson();
    } else {
      logger.info('previewing changes for file: %s', packageJsonPath);
      logger.log(packageJson.diff());
    }
  }

  const migrations = upgrade.migrations;
  if (migrations && migrations.length > 0) {
    for (const migration of migrations) {
      logger.verbose('running migration: %s', migration.name);

      await migration.migrate({
        ...options,
        workspaceDir: workspace.directory,
      });
    }
  }
}

/**
 * @param {Array<string>} workspaces
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
        message: `Would you like to run the ${upgrade.name} upgrade?
        (${upgrade.description})`,
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
        return {
          name: `${upgrade.name} (${upgrade.description})`,
          value: upgrade.name,
        };
      }),
      default: 0,
    },
  ]);

  if (answers.upgrade === undefined || answers.upgrade === null) {
    return null;
  }

  return upgrades.find((upgrade) => {
    return upgrade.name === answers.upgrade;
  });
}
