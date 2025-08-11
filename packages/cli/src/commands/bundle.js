/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'path';
import { createLogger } from '../logger.js';
import bundlers from './bundle/bundlers.js';

const logger = createLogger('bundle');

async function bundle({ entrypoint, name, globals }) {
  logger.start('bundle');

  const cwd = process.cwd();
  const extension = path.extname(entrypoint);

  if (!bundlers.has(extension)) {
    logger.info(
      `Invalid extension: \`${extension}\` on entrypoint: \`${entrypoint}\``
    );
    process.exit(1);
  }

  try {
    const bundle = bundlers.get(extension);
    await bundle(path.join(cwd, entrypoint), {
      name,
      globals,
    });
  } catch (error) {
    logger.info(`Unexpected error occurred while bundling ${entrypoint}:`);
    console.log(error);
    process.exit(1);
  }

  logger.stop();
}

export const builder = (yargs) => {
  yargs.positional('entrypoint', {
    type: 'string',
    describe: 'the entrypoint Javascript file',
  });

  yargs.options({
    n: {
      alias: 'name',
      describe: 'the name of the module for the UMD build',
      type: 'string',
    },
    g: {
      alias: 'globals',
      describe: 'global module names',
      type: 'string',
    },
  });
};
export const command = 'bundle <entrypoint>';
export const desc = 'bundle the given .js entrypoint';
export const handler = bundle;
