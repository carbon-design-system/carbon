'use strict';

const chalk = require('chalk');

console.warn(
  chalk.yellow('Warning: ') +
    chalk.cyan('carbon-components') +
    " is soon to be deprecated and is no longer receiving updates, we recommend to move to it's replacement, " +
    chalk.cyan('@carbon/styles') +
    '  at your earliest convenience. Please visit ' +
    chalk.dim.underline.italic(
      'https://github.com/carbon-design-system/carbon/discussions/12179'
    ) +
    ' for more information on the package strategy, deprecation, and plan of action.'
);
