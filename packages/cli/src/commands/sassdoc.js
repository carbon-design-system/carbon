/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

async function sassdoc({ glob, ignore, json, output }) {
  console.log('Options:');
  console.log('Glob', glob);
  console.log('Ignore', ignore);
  console.log('JSON', json);
  console.log('output', output);
}

module.exports = {
  command: 'sassdoc <glob>',
  desc: '',
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
      j: {
        alias: 'json',
        describe: 'output as json file',
        type: 'boolean',
      },
      o: {
        alias: 'output',
        describe: 'specify the directory in which the files are output',
        type: 'string',
      },
    });
  },
  handler: sassdoc,
};
