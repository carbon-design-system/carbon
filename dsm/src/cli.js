/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const cli = require('yargs');
const packageJson = require('../package.json');

async function main({ argv, exit }) {
  cli
    .scriptName(packageJson.name)
    .version(packageJson.version)
    .usage('Usage: $0 [options]');

  cli
    .commandDir('commands')
    .strict()
    .fail((message, error) => {
      if (error) {
        console.error(error.stderr || error);
      } else {
        console.error(message);
        console.log(yargs.help());
      }
      exit(1);
    });

  cli.parse(argv.slice(2)).argv;
}

module.exports = main;
