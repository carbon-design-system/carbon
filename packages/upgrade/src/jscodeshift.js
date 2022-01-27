/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'path';
import execa from 'execa';

let _jscodeshift;

function getBinPath() {
  if (!_jscodeshift) {
    const directory = path.dirname(require.resolve('jscodeshift'));
    _jscodeshift = path.join(directory, 'bin', 'jscodeshift.js');
  }
  return _jscodeshift;
}

export async function run(options) {
  const {
    cwd,
    stdio = 'inherit',
    parser = 'babel',
    paths,
    transform,
  } = options;
  const args = [
    paths,
    `-t=${transform}`,
    `--parser=${parser}`,
    `--ignore-pattern=**/build/**`,
    `--ignore-pattern=**/dist/**`,
    `--ignore-pattern=**/es/**`,
    `--ignore-pattern=**/lib/**`,
    `--ignore-pattern=**/node_modules/**`,
    `--ignore-pattern=**/storybook-static/**`,
    `--ignore-pattern=**/umd/**`,
  ];

  if (options.print) {
    args.push('--print');
  }

  if (options.verbose) {
    args.push('-v');
  }

  if (options.dry) {
    args.push('--dry');
  }

  console.log(args);

  return await execa(getBinPath(), args, {
    cwd,
    stdio,
  });
}
