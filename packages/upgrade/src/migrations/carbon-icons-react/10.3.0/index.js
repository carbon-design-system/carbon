/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { prompt } = require('inquirer');
const path = require('path');
const { run } = require('../../../tools/jscodeshift');

const TARGET_VERSION = '10.4.0';

module.exports = {
  version: TARGET_VERSION,
  from: [
    {
      version: '>=10.0.0 <=10.3.0',
      async migrate(options) {
        const transformFile = require.resolve('./update-icon-import-path');
        const answers = await prompt([
          {
            type: 'input',
            name: 'folder',
            message: `What directory would you like this script to changes files in?`,
            default: '.',
          },
          {
            type: 'confirm',
            name: 'print',
            message:
              `Would you like us to print the changed file contents ` +
              `to the terminal?`,
            default: true,
          },
        ]);

        await run(transformFile, {
          cwd: options.cwd,
          dry: options.dry,
          folder: path.resolve(options.cwd, answers.folder),
          print: answers.print,
        });
      },
    },
  ],
};
