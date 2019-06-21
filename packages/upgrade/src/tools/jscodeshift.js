/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const which = require('npm-which');
const spawn = require('./spawn');

let jscodeshift;

function run(transformFile, options) {
  if (!jscodeshift) {
    jscodeshift = which.sync('jscodeshift', {
      // Note: we could pass options.cwd but could that potentially resolve
      // to a version of jscodeshift that we're not expecting?
      cwd: __dirname,
    });
  }

  const { cwd, stdio = 'inherit', ...jscodeshiftOptions } = options;
  const args = [
    jscodeshiftOptions.print && '--print',
    '--babel',
    jscodeshiftOptions.dry && '--dry',
    '--parser=babylon',
    `--ignore-pattern=**/build/**`,
    `--ignore-pattern=**/dist/**`,
    `--ignore-pattern=**/es/**`,
    `--ignore-pattern=**/lib/**`,
    `--ignore-pattern=**/node_modules/**`,
    `--ignore-pattern=**/storybook-static/**`,
    `--ignore-pattern=**/umd/**`,
    `-t=${transformFile}`,
    jscodeshiftOptions.folder,
  ].filter(Boolean);

  return spawn(jscodeshift, args, {
    cwd,
    stdio,
  });
}

module.exports = {
  run,
};
