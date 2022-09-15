/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const execa = require('execa');

/**
 * Executes the given command.
 * @param {string} command The command.
 * @param {string[]} [args=[]] The arguments.
 * @param {Object} [options] The options.
 */
function exec(command, args = [], options) {
  const promise = execa(command, args, options);
  promise.stdout.pipe(process.stdout);
  promise.stderr.pipe(process.stderr);
  return promise;
}

module.exports = exec;
