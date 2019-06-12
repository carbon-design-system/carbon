/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const cli = require('yargs');
const packageJson = require('../package.json');

const commands = [require('./commands/ci-check'), require('./commands/sync')];

async function main({ argv }) {
  cli
    .scriptName(packageJson.name)
    .version(packageJson.version)
    .usage('Usage: $0 [options]');

  for (const command of commands) {
    command.register(cli);
  }

  cli.strict().parse(argv.slice(2)).argv;
}

module.exports = main;
