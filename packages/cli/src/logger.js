/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const chalk = require('chalk');

/**
 * Create a logger to be used in a handler. This is typically just for
 * formatting the output, adding a prefix, and connecting the output with
 * box-drawing ASCII characters.
 * @returns {object}
 */
function createLogger(command) {
  const timers = [];
  let indentLevel = 0;

  /**
   * Display the given message with a box character. This also includes
   * formatting for the logger prefix and box character itself.
   * @param {string} boxCharacter
   * @param {string?} message
   * @returns {void}
   */
  function log(boxCharacter, message = '') {
    console.log(chalk`{yellow ${command} ▐} {gray ${boxCharacter}} ${message}`);
  }

  function getLinePrefix() {
    let prefix = '';
    for (let i = 0; i < indentLevel; i++) {
      prefix += '┃  ';
    }
    return prefix;
  }

  return {
    info(message) {
      indentLevel -= 1;
      const prefix = getLinePrefix();
      indentLevel += 1;

      log(prefix + '┣', chalk.gray(message));
    },
    start(message) {
      const start = Date.now();
      timers.push(start);

      const prefix = getLinePrefix();
      log(prefix + '┏', message);

      indentLevel += 1;
    },
    stop(message) {
      indentLevel -= 1;

      const duration = ((Date.now() - timers.pop()) / 1000).toFixed(2);
      const prefix = getLinePrefix();

      if (message) {
        log(prefix + '┗', message);
      } else {
        log(prefix + '┗', chalk`{gray Done in {italic ${duration}s}}`);
      }
    },
    newline() {
      const prefix = getLinePrefix();
      log(prefix + '┃');
    },
  };
}

/**
 * Display the banner in the console, typically at the beginning of a handler
 * @returns {void}
 */
function displayBanner() {
  console.log(`
                 _
                | |
   ___ __ _ _ __| |__   ___  _ __
  / __/ _\` | '__| '_ \\ / _ \\| '_ \\
 | (_| (_| | |  | |_) | (_) | | | |
  \\___\\__,_|_|  |_.__/ \\___/|_| |_|
`);
}

module.exports = {
  createLogger,
  displayBanner,
};
