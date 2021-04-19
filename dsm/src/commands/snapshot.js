/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { Workspace } = require('../workspace');

async function snapshot() {
  console.log('[snapshot] clearing existing snapshot');
  await Workspace.clearSnapshot();

  console.log('[snapshot] creating snapshot');
  const workspace = await Workspace.get(process.cwd());
  await Workspace.snapshot(workspace);
}

module.exports = {
  command: 'snapshot',
  desc: 'snapshot the existing workspace',
  handler: snapshot,
};
