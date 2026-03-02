/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createRequire } from 'module';

// Import commands explicitly since yargs commandDir() doesn't support ESM yet
import * as bundle from './commands/bundle.js';
import * as check from './commands/check.js';
import * as ciCheck from './commands/ci-check.js';
import * as changelog from './commands/changelog.js';
import * as component from './commands/component.js';
import * as contribute from './commands/contribute.js';
import * as inline from './commands/inline.js';
import * as publish from './commands/publish.js';
import * as release from './commands/release.js';

const require = createRequire(import.meta.url);

const packageJson = require('../package.json');

// Create yargs command config with optional properties
function createCommand(cmd) {
  const config = {
    command: cmd.command,
    desc: cmd.desc,
    handler: cmd.handler,
  };
  if (cmd.builder) {
    config.builder = cmd.builder;
  }
  return config;
}

export async function main({ argv }) {
  yargs(hideBin(argv))
    .scriptName(packageJson.name)
    .version(packageJson.version)
    .usage('Usage: $0 [options]')
    // Add commands explicitly
    .command(createCommand(bundle))
    .command(createCommand(check))
    .command(createCommand(ciCheck))
    .command(createCommand(changelog))
    .command(createCommand(component))
    .command(createCommand(contribute))
    .command(createCommand(inline))
    .command(createCommand(publish))
    .command(createCommand(release))
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
