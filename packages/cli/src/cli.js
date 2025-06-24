/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const cli = require('yargs');
const packageJson = require('../package.json');

async function main({ argv }) {
  cli
    .scriptName(packageJson.name)
    .version(packageJson.version)
    .usage('Usage: $0 [options]')
    .commandDir('commands')
    .strict()
    .fail((message, error, yargs) => {
      if (error) {
        if (error.stderr) {
          console.error(error.stderr);
          process.exit(1);
        }
        console.error(error);
        process.exit(1);
      }
      console.log(message);
      console.log(yargs.help());
      process.exit(1);
    })
    .parse(argv.slice(2));
}

module.exports = main;
