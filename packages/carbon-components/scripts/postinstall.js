/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

async function main() {
  const { default: chalk } = await import('chalk');

  // eslint-disable-next-line no-console
  console.warn(
    chalk.yellow('Warning: ') +
      'the ' +
      chalk.cyan('carbon-components') +
      ' package is no longer supported. More info at ' +
      chalk.dim.underline.italic('https://carbondesignsystem.com/deprecations/')
  );
}

main();
