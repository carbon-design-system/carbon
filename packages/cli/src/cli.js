/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import commands from './commands/index.js';
import { hideBin } from 'yargs/helpers';
import packageJson from '../package.json' assert { type: 'json' };
import yargs from 'yargs';

export default async function main({ argv }) {
  yargs(hideBin(process.argv.slice(2)))
    .scriptName(packageJson.name)
    .version(packageJson.version)
    .usage('Usage: $0 [options]');

  yargs(hideBin(process.argv.slice(2)))
    .command(commands)
    .strict()
    .fail((message, error, yargs) => {
      if (error) {
        if (error.stderr) {
          console.error(error.stderr);
          process.exit(1);
        }
        console.error(error);
        process.exit(1);
        return;
      }
      console.log(message);
      console.log(yargs.help());
      process.exit(1);
    })
    .parse();
}
