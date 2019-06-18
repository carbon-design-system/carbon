/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

'use strict';

const cli = require('yargs');
const packageJson = require('../package.json');
const { UpgradeError } = require('./error');
const { reporter } = require('./reporter');
const { run, runInDirectory } = require('./runner');

async function main({ argv, cwd }) {
  cli.scriptName(packageJson.name).version(packageJson.version);

  cli
    .option('verbose', {
      default: false,
      describe: 'display the full output while running a command',
    })
    .option('dry', {
      alias: 'd',
      describe:
        'view the result of running this command without changing any files',
      default: false,
    })
    .option('ignore', {
      alias: 'i',
      describe:
        'provide a list of glob pattern for directories you would like ignored',
      default: '',
      array: true,
    });

  cli
    .usage('Usage: $0 [options]')
    .command('$0', 'run to upgrade your project', {}, async args => {
      const { dry, ignore, verbose } = args;
      const options = {
        cwd: cwd(),
        dry,
        ignore,
        verbose,
      };

      await runCommand(() => runInDirectory(options), options);
    });

  cli.command(
    'migrate <package> <from> <to>',
    'run a specific migration for a package',
    {},
    async args => {
      const { dry, from, ignore, package: packageName, to, verbose } = args;
      const options = {
        cwd: cwd(),
        dry,
        ignore,
        verbose,
      };

      await runCommand(() => run(packageName, from, to, options), options);
    }
  );

  cli
    .demandCommand()
    .recommendCommands()
    .strict()
    .parse(argv.slice(2)).argv;
}

async function runCommand(makePromise, options) {
  reporter.info('Thanks for trying out carbon-upgrade! 🙏');
  reporter.info(
    'To help prevent any accidental changes, make sure to check in your ' +
      'work in version control first and use dry mode (-d flag) to ' +
      'preview any updates!'
  );

  if (options.verbose) {
    reporter.setLogLevel('verbose');
  }

  try {
    await makePromise();
    console.log('Done! ✨');
  } catch (error) {
    if (error instanceof UpgradeError) {
      reporter.error(error.message);
      return;
    }
    reporter.error('Yikes, looks like something really went wrong.');
    reporter.error('Please make an issue with the following info:');
    console.log(error);
  }
}

module.exports = main;
