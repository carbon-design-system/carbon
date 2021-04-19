/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const { Cache } = require('../cache');
const { Workspace } = require('../workspace');

const groups = new Map([
  ['artifacts', cleanArtifacts],
  ['cache', cleanCache],
  ['node_modules', cleanNodeModules],
  ['snapshot', cleanSnapshot],
]);

async function clean(args) {
  const tasks =
    args.group.length === 0 ? Array.from(groups.keys()) : args.group;

  console.log('[clean] running command for groups: %s', tasks);

  await Promise.all(
    tasks.map(async (group) => {
      if (!groups.has(group)) {
        throw new Error(`Unable to find runner for group: ${group}`);
      }

      const runner = groups.get(group);
      return runner();
    })
  );
}

function cleanArtifacts() {
  console.log('[cache] clearing build artifacts');
  throw new Error('Unimplemented');
}

function cleanCache() {
  console.log('[cache] clearing cache');
  return Cache.clear();
}

async function cleanNodeModules() {
  const workspace = await Workspace.get(process.cwd());

  await Promise.all(
    workspace.packages.map(async (pkg) => {
      const nodeModulesDirectory = path.join(pkg.directory, 'node_modules');
      if (fs.existsSync(nodeModulesDirectory)) {
        console.log('[clean] removing node_modules: %s', nodeModulesDirectory);
        return fs.remove(nodeModulesDirectory);
      }
    })
  );

  const rootNodeModules = path.join(workspace.directory, 'node_modules');
  if (fs.existsSync(rootNodeModules)) {
    console.log('[clean] removing node_modules: %s', rootNodeModules);
    await fs.remove(rootNodeModules);
  }
}

function cleanSnapshot() {
  console.log('[workspace] clearing snapshot');
  return Workspace.clearSnapshot();
}

module.exports = {
  command: 'clean [group..]',
  desc: 'clean up the workspace by removing generated folders or files',
  builder(yargs) {
    yargs.positional('group', {
      describe: 'specify the groups in the monorepo to clean',
      choices: ['artifacts', 'cache', 'node_modules', 'snapshot'],
    });
  },
  handler: clean,
};
