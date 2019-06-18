/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const which = require('npm-which');
const spawn = require('../../tools/spawn');

const TARGET_VERSION = '10.4.0';

module.exports = {
  version: TARGET_VERSION,
  from: [
    {
      version: '>=10.x',
      async migrate(options) {
        const jscodeshift = which.sync('jscodeshift', {
          // Note: we could pass options.cwd but could that potentially resolve
          // to a version of jscodeshift that we're not expecting?
          cwd: __dirname,
        });
        const transformFile = require.resolve('./update-icon-import-path');
        const args = [
          '--print',
          '--babel',
          '--dry',
          '--parser=babylon',
          `--ignore-pattern=**/build/**`,
          `--ignore-pattern=**/dist/**`,
          `--ignore-pattern=**/es/**`,
          `--ignore-pattern=**/lib/**`,
          `--ignore-pattern=**/node_modules/**`,
          `--ignore-pattern=**/storybook-static/**`,
          `--ignore-pattern=**/umd/**`,
          `-t=${transformFile}`,
          options.cwd,
        ];

        await spawn(jscodeshift, args, {
          cwd: options.cwd,
          stdio: 'inherit',
        });
      },
    },
  ],
};
