/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5,
};

/**
 * @param {string} level
 * @returns {string}
 */
function getColor(level) {
  switch (level) {
    case 'error':
      return chalk.red('[error]');
    case 'warn':
      return chalk.yellow('[warn]');
    case 'info':
    case 'verbose':
      return chalk.blue(`[${level}]`);
    case 'debug':
    case 'silly':
      return chalk.cyan(`[${level}]`);
    default:
      throw new Error(`Unknown level: ${level}`);
  }
}

const defaultLevel = process.env.NODE_ENV === 'test' ? 'warn' : 'info';

/**
 * @typedef LoggerInstance
 * @property {Function} error
 * @property {Function} warn
 * @property {Function} info
 * @property {Function} verbose
 * @property {Function} debug
 * @property {Function} silly
 * @property {Function} log
 */

const Logger = {
  /**
   * @param {string} level
   * @returns {LoggerInstance}
   */
  create(level = defaultLevel) {
    let max = levels[level];
    const logger = {
      setLevel(level) {
        max = levels[level];
      },
      log(...args) {
        console.log(...args);
      },
    };

    function log(level, message, ...args) {
      if (levels[level] <= max) {
        const formatted = getColor(level);
        console.log(`${formatted} ${message}`, ...args);
      }
    }

    for (const level of Object.keys(levels)) {
      logger[level] = (...args) => {
        log(level, ...args);
      };
    }

    return logger;
  },
};

export const logger = Logger.create(process.env.LOG_LEVEL);
