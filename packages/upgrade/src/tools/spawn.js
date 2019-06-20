/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const spawn = require('cross-spawn');

function spawnAsync(command, args, options) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, options);
    const defaultStderr = {
      command: `${command} ${args.join(' ')}`,
    };
    let stdout = '';
    let stderr = '';

    if (child.stdout) {
      child.stdout.on('data', data => {
        stdout += `${data}`;
      });
    }

    if (child.stderr) {
      child.stderr.on('data', data => {
        stderr += `${data}`;
      });
    }

    child.on('close', code => {
      if (code !== 0) {
        reject(stderr || defaultStderr);
        return;
      }
      resolve(stdout);
    });

    child.on('error', error => {
      reject(error);
      return;
    });
  });
}

spawnAsync.sync = spawn.sync;

module.exports = spawnAsync;
