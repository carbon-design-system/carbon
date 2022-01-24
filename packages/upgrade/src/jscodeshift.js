/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import which from 'npm-which';
import spawn from './spawn';
import path from 'path';

let jscodeshift;

function run(transformFileName, options) {
  console.log(options);
  if (!jscodeshift) {
    jscodeshift = which.sync('jscodeshift', {
      cwd: __dirname,
    });
  }

  const {
    cwd,
    stdio = 'inherit',
    TRANSFORM_DIR,
    ...jscodeshiftOptions
  } = options;
  const transformFile = path.join(TRANSFORM_DIR, transformFileName);
  const args = [
    jscodeshiftOptions.print && '--print',
    jscodeshiftOptions.verbose && '-v',
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
    jscodeshiftOptions.workspaceDir,
  ].filter(Boolean);

  return spawn(jscodeshift, args, {
    cwd,
    stdio,
  });
}

module.exports = {
  run,
};
