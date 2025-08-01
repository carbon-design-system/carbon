/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const command = 'contribute <command>';
export const desc = 'get started contributing with Carbon';

export const builder = (yargs) => {
  yargs.commandDir('contribute');
};
