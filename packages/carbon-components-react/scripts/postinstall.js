'use strict';

const chalk = require('chalk');

console.warn(
  chalk.yellow('Warning: ') +
    'the ' +
    chalk.cyan('carbon-components-react') +
    ' package is no longer supported. More info at ' +
    chalk.dim.underline.italic('https://carbondesignsystem.com/deprecations/')
);
