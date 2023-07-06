/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const chalk = require('chalk');

class ConsoleReporter {
  constructor({
    stderr = process.stderr,
    stdin = process.stdin,
    stdout = process.stdout,
  } = {}) {
    this.format = chalk;
    this.stderr = stderr;
    this.stdin = stdin;
    this.stdout = stdout;
  }

  error(message) {
    this._logCategory('error', 'bgRed', message);
  }

  header(message) {
    this.log(this.format.bold(message));
  }

  info(message) {
    this._logCategory('info', 'bgBlue', chalk.gray(message));
  }

  log(message = '') {
    this.stdout.write(`${message}\n`);
  }

  stack(error) {
    this.stdout.write(`\n${error.stack}\n\n`);
  }

  success(message) {
    this._logCategory('success', 'bgGreen', message);
  }

  _logCategory(category, color, message) {
    const block = this.format[color](
      ` ${chalk.black(category.toUpperCase())} `
    );
    this.log(`${block} ${message}`);
  }
}

module.exports = {
  ConsoleReporter,
  reporter: new ConsoleReporter(),
};
