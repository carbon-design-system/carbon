/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const cli = require('yargs');
const isGitClean = require('is-git-clean');
const packageJson = require('../package.json');
const { UpgradeError } = require('./error');
const { Migration } = require('./migration');
const { Planner } = require('./planner');
const { Project } = require('./project');
const { Runner } = require('./runner');
const { Upgrades, UpgradeRunner } = require('./upgrades');

async function main({ argv, cwd }) {
  cli.scriptName(packageJson.name).version(packageJson.version);

  cli
    .option('verbose', {
      default: false,
      describe: 'display the full output while running a command',
    })
    .option('write', {
      alias: 'w',
      describe: 'update the files with changes found by running the migration',
      default: false,
    })
    .option('ignore', {
      alias: 'i',
      describe:
        'provide a list of glob pattern for directories you would like ignored',
      default: [],
      array: true,
    });

  cli.usage('Usage: $0 [options]').command(
    '$0',
    'run to upgrade your project',
    {},
    run(async (args) => {
      const { ignore, verbose, write } = args;
      const options = {
        cwd: cwd(),
        ignore,
        verbose,
        write,
      };

      // Find what we can offer
      const project = await Project.detect(options.cwd);
      const availableUpgrades = Upgrades.getAvailableUpgradesFor(
        project.getWorkspaces()
      );
      // TODO: get available upgrades by workspace for migrations

      // Choose your stuff
      // TODO: what kind of UI do we display to let people choose what upgrades
      // or migrations to apply?
      const selectedUpgrades = availableUpgrades;
      const selectedMigrations = [];

      // Run your stuff
      if (selectedUpgrades.length > 0) {
        for (const { workspace, upgrades } of selectedUpgrades) {
          for (const upgrade of upgrades) {
            await UpgradeRunner.run(workspace, upgrade);
          }
        }
      } else if (selectedMigrations.length > 0) {
        // TODO: migration runner for workspace
      }

      // TODO: should we run upgrades _and_ migrations?
      // Probably not, they could overlap. We should pick one

      // const availableMigrations = Migration.getAvailableMigrationsFor(project);

      // Get the available upgrades for the project
      // Get the available migrations for the project

      // const migrationsByWorkspace = await Migration.getMigrationsByWorkspace(
      // Array.from(project.getWorkspaces()),
      // Migration.getMigrations()
      // );

      // const migrationsToRun = Planner.getSelectedMigrations(
      // migrationsByWorkspace
      // );

      // await Runner.run(migrationsToRun, options);
    })
  );

  cli.strict().parse(argv.slice(2)).argv;
}

function run(command) {
  return async (...args) => {
    // checks git status on pwd, returns true if clean / false if not
    // let isClean = isGitClean.sync();

    console.log('Thanks for trying out @carbon/upgrade! 🙏');
    console.log('Checking git status...👀');

    // if (!isClean) {
    // console.error(
    // 'Git directory is not clean. Please stash or commit your changes.'
    // );
    // process.exit(1);
    // }

    try {
      await command(...args);
      console.log('Done! ✨');
    } catch (error) {
      if (error instanceof UpgradeError) {
        console.error(error.message);
        process.exit(1);
      }
      console.error('Yikes, looks like something really went wrong.');
      console.error('Please make an issue with the following info:');
      console.log(error);
      process.exit(1);
    }
  };
}

module.exports = main;
