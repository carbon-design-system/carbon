/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { prompt } = require('inquirer');
const semver = require('semver');
const cli = require('yargs');
const packageJson = require('../package.json');
const { UpgradeError } = require('./error');
const { Migration } = require('./migrations');
const { findProject } = require('./project');

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

      // Phase 1: get all the details of the project
      const project = await findProject(options.cwd);
      const workspaces = await Migration.getMigrationsByWorkspace(
        project,
        Migration.getMigrations()
      );

      const answers = [];

      for (const workspace of workspaces) {
        const answer = await prompt({
          type: 'checkbox',
          message: `Migrations available for ${workspace.name}`,
          name: 'selected',
          choices: workspace.options
            .filter((option) => {
              return option.available === true;
            })
            .map((option) => {
              const { dependency, migration } = option;
              return {
                name: `Migration ${dependency.name} from: ${dependency.version} to: ${migration.to}`,
                value: option,
                checked: true,
              };
            }),
        });

        answers.push(answer);
      }

      await Migration.applyMigrations(
        workspaces.map((workspace, i) => {
          const answer = answers[i];
          return {
            ...workspace,
            options: workspace.options.filter((option) => {
              return answer.selected.includes(option);
            }),
          };
        })
      );

      // Get selections for migrations
      // Hey! We found the following migrations available for the `foo` package,
      // select all that you would like to run:
      //
      // <workspace name>
      // [ ] @carbon/colors v10.10.0 => v11.0.0
      //
      // <workspace name>
      // [ ] @carbon/colors v10.10.0 => v11.0.0
      //
      // Unavailable migrations
      // XXX @carbon/type v10.10.0 unable to migrate because version does not meet min requirements
    })
  );

  cli.command(
    'migrate <package> <from> <to>',
    'run a specific migration for a package',
    {},
    run(async (args) => {
      const { from, ignore, package: packageName, to, write, verbose } = args;
      const options = {
        cwd: cwd(),
        dry,
        ignore,
        verbose,
        write,
        from,
        to,
        packageName,
      };
      console.log(options);
    })
  );

  cli.strict().parse(argv.slice(2)).argv;
}

function run(command) {
  return async (...args) => {
    console.log('Thanks for trying out @carbon/upgrade! 🙏');

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
