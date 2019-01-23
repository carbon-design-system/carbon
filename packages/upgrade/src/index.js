/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const program = require('commander');
const packageJson = require('../package.json');
const { reporter } = require('./reporter');
const run = require('./run');

async function main({ argv, cwd }) {
  program
    .name(packageJson.name)
    .version(packageJson.version)
    .usage('[options]')
    .option(
      '-d, --dry',
      'view the result of running this command without changing any files',
      false
    )
    .option(
      '--verbose',
      'display the full output while running this command',
      false
    )
    .action(async cmd => {
      const { dry = false, verbose = false } = cmd;
      if (verbose) {
        reporter.setLogLevel('verbose');
      }

      try {
        await run({ cwd: cwd(), dry, verbose });
      } catch (error) {
        console.log(
          'Yikes, looks like something went wrong running this command'
        );
        console.log('Please make an issue with the following info:');
        console.log(error);
        process.exit(1);
      }
    })
    .parse(argv);
}

module.exports = main;
