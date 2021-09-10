/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const glob = require('fast-glob');
const path = require('path');
const { createLogger } = require('../logger');
const compile = require('../compile');

const logger = createLogger('check');

async function check({ glob: pattern, ignore = [], list = false }) {
  const cwd = process.cwd();

  logger.start('check');
  logger.info(`Running in: ${cwd}`);
  logger.info(`Checking pattern: '${pattern}', ignoring: '${ignore}'`);

  const files = await glob(pattern, {
    cwd,
    ignore,
  });

  logger.info(`Compiling ${files.length} files...`);

  try {
    compile(files.map((file) => path.join(cwd, file)));

    if (list) {
      logger.info('Compiled the following files:');
      console.log(files);
    }

    logger.info(`Successfully compiled ${files.length} files! 🎉`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    logger.stop();
  }
}

module.exports = {
  command: 'check <glob>',
  desc: 'check that each file can be compiled',
  builder(yargs) {
    yargs.positional('glob', {
      type: 'string',
      describe: 'glob pattern for files to check',
    });

    yargs.options({
      i: {
        alias: 'ignore',
        describe: 'provide a glob pattern of files to ignore',
        type: 'string',
      },
      l: {
        alias: 'list',
        describe: 'list all the files that were compiled',
        type: 'boolean',
      },
    });
  },
  handler: check,
};
