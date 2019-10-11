/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  command: 'contribute <command>',
  desc: 'get started contributing with Carbon',
  builder(yargs) {
    yargs.commandDir('contribute');
  },
};
