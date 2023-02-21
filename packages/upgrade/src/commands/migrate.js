/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import inquirer from 'inquirer';
import { UpgradeError } from '../error';
import { logger } from '../logger';
import { Workspace, getAvailableWorkspaces } from '../workspace';

export async function migrate(options, upgrades = []) {
  logger.verbose('running migrate command with options: %o', options);

  const migrations = upgrades
    .filter((upgrade) => {
      return upgrade.migrations && upgrade.migrations.length > 0;
    })
    .flatMap((upgrade) => {
      return upgrade.migrations;
    });

  if (!migrations || migrations.length === 0) {
    logger.info('No migrations available');
    return;
  }

  // List available migrations
  if (options.list) {
    listMigrations(migrations);
    return;
  }

  const workspaces = getAvailableWorkspaces(options.cwd);
  if (workspaces.length === 0) {
    throw new UpgradeError('Unable to find a workspace to migrate');
  }

  // Only run the migration specified in the options
  if (options.migration) {
    const migration = migrations.find((migration) => {
      return migration.name === options.migration;
    });

    if (!migration) {
      logger.error(
        'Sorry, there is no migration with the name "%s"',
        options.migration
      );
      listMigrations(migrations);
    } else {
      await runMigration(migration, workspaces, options);
    }

    return;
  } else {
    logger.error('A migration must be specified');
  }
}

/**
 * @param {Array<Migrations>} migrations
 * @returns {<void>}
 */
function listMigrations(migrations) {
  logger.log('Available migrations:');
  for (const migration of migrations) {
    logger.log('  - %s (%s)', migration.name, migration.description);
  }
}

/**
 * @param {Object<Migration>} migration
 * @param {Array<string>} workspaces
 * @returns {<void>}
 */
async function runMigration(migration, workspaces, options) {
  const workspace = await getSelectedWorkspace(workspaces);

  logger.verbose(
    'running migration: %s for workspace: %s',
    migration.name,
    workspace.directory
  );

  await migration.migrate({ ...options, workspaceDir: workspace.directory });
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
