/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk';
import isGitClean from 'is-git-clean';
import packageJson from '../package.json';
import { logger } from './logger';
import { upgrade } from './commands/upgrade';
import { UpgradeError } from './error';

// Note: for esbuild we need this import to be CommonJS
// - https://github.com/yargs/yargs/issues/1929
// - https://github.com/evanw/esbuild/issues/1492
// - https://github.com/yargs/yargs/blob/main/docs/bundling.md#esbuild
const cli = require('yargs');

export async function main({ argv, cwd }) {
  cli.scriptName(packageJson.name).version(packageJson.version);

  cli
    .option('force', {
      describe: 'force execution if the cli encounters an error',
      default: false,
      type: 'boolean',
    })
    .option('write', {
      alias: 'w',
      describe: 'update the files with changes found by running the migration',
      default: false,
    })
    .option('verbose', {
      alias: 'v',
      describe: 'optionally include additional logs, useful for debugging',
      default: false,
      type: 'boolean',
    });

  cli.usage('Usage: $0 [options]').command(
    '$0',
    'upgrade your project',
    {},
    run(async (args) => {
      const { verbose, write } = args;
      const options = {
        cwd: cwd(),
        verbose,
        write,
      };
      await upgrade(options);
    })
  );

  cli.strict().parse(argv.slice(2));
}

/**
 * @param {Function} command
 * @returns {Function}
 */
function run(command) {
  return async (args) => {
    if (args.verbose === true) {
      logger.setLevel('verbose');
    }

    console.log('Thanks for trying out @carbon/upgrade! 🙏');

    // Inspired by react-codemod:
    // https://github.com/reactjs/react-codemod/blob/b34b92a1f0b8ad333efe5effb50d17d46d66588b/bin/cli.js#L22
    let clean = false;
    let errorMessage = 'Unable to determine if git directory is clean';

    try {
      clean = isGitClean.sync(process.cwd());
      errorMessage = 'Git directory is not clean';
    } catch (error) {
      if (
        error &&
        error.stderr &&
        err.stderr.includes('Not a git repository')
      ) {
        clean = true;
      }
    }

    if (!clean && args.force !== true) {
      console.log(
        chalk.yellow('[warning]'),
        'It appears that you have untracked changes in your project. Before we continue, please stash or commit your changes to git.'
      );
      console.log(
        '\nYou may use the --force flag to override this safety check.'
      );
      process.exit(1);
    }

    try {
      await command(args);
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
