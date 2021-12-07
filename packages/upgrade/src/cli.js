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

      //Returns all the workspaces
      const project = await Project.detect(options.cwd);

      // This is where we get available migrations
      // returns obj with worskpace & migration options
      //  {
      //   workspace: Workspace {
      //     directory: '/Users/[username]/Desktop/carbon/packages/test-utils',
      //     name: '@carbon/test-utils',
      //     version: '10.20.0',
      //     dependencies: [Array],
      //     workspaces: Set(0) {},
      //     id: '4zWe7Y'
      //   },
      //   migrationOptions: [ [Object], [Object] ]
      // }
      const migrationsByWorkspace = await Migration.getMigrationsByWorkspace(
        Array.from(project.getWorkspaces()),
        Migration.getMigrations()
      );

      // This is where we choose (checkbox) what migrations to run
      // based on the available migrationOptions
      const migrationsToRun = await Planner.getSelectedMigrations(
        migrationsByWorkspace
      );

      // This is where we run the migration (update package.json, etc)
      // based on the migrations we selected above
      await Runner.run(migrationsToRun, options);
    })
  );

  cli.strict().parse(argv.slice(2)).argv;
}

function run(command) {
  return async (...args) => {
    // checks git status on pwd, returns true if clean / false if not
    let isClean = isGitClean.sync();

    console.log('Thanks for trying out @carbon/upgrade! 🙏');
    console.log('Checking git status...👀');

    if (!isClean) {
      console.error(
        'Git directory is not clean. Please stash or commit your changes.'
      );
      // process.exit(1);
      console.log('would normally exit here');
    }

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

// UPGRADE FLOW:
// 1. run upgrade command
// 2. check git status
// 3. check what version you're on
//     - "Looks like you're using `vX.X.X` of ..."
// 4. check what migrations are available fo them
//     - "These are the migrations available to you:"
// 5. List out migrations with ability to choose which to upgrade to
//     - can upgrade to v10 newer version, or v11 if within range
// 6. user picks migration
// 7. confirm user selection (y/N)
// 8. we run migration (install update or new package)
//     - this just updates package.json
// 9. log diff for user

// QUESTIONS: this flow implies a single workspace, but would it work for multiple workspaces?
