'use strict';

const chalk = require('chalk');

// eslint-disable-next-line no-console
console.warn(
  chalk.yellow('Warning: ') +
    'the ' +
    chalk.cyan('carbon-components') +
    ' package is no longer supported. More info at ' +
    chalk.dim.underline.italic('https://carbondesignsystem.com/deprecations/')
);
