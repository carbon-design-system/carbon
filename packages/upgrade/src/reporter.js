/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const chalk = require('chalk');

// Fix bold on Windows
// Reference: https://github.com/yarnpkg/yarn/blob/ed2c8a50c02505bdd6bd67d5e8c4461abc2b8dae/src/reporters/console/console-reporter.js#L32-L35
if (
  process.platform === 'win32' &&
  !(process.env.TERM && /^xterm/i.test(process.env.TERM))
) {
  chalk.bold._styles[0].close += '\u001b[m';
}

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
    this._logLevel = 'info';
  }

  error(message) {
    this._logCategory('error', 'red', message);
  }

  header(message) {
    this.log(this.format.bold(message));
  }

  info(...args) {
    const message = args.length !== 0 ? args.join(' ') : '';
    this._logCategory('info', 'blue', message);
  }

  log(message = '') {
    this.stdout.write(`${message}\n`);
  }

  setLogLevel(level) {
    this._logLevel = level;
  }

  stack(error) {
    this.stdout.write(`\n${error.stack}\n\n`);
  }

  success(message) {
    this._logCategory('success', 'green', message);
  }

  verbose(message) {
    if (this._logLevel === 'verbose') {
      this._logCategory('verbose', 'yellow', message);
    }
  }

  _logCategory(category, color, message) {
    const block = this.format[color](category.toLowerCase());
    this.log(`${block} ${message}`);
  }
}

module.exports = {
  reporter: new ConsoleReporter(),
};
