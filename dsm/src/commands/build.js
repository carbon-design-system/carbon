/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { Workspace } = require('../workspace');

async function build(flags) {
  const workspace = await Workspace.get(process.cwd());
  const packages = getPackagesFromFlags(workspace, flags);

  console.log(
    '[build] building packages: %s',
    packages.map((pkg) => {
      return pkg.info.name;
    })
  );
}

function getPackagesFromFlags(workspace, flags) {
  if (flags.package) {
    const names = Array.isArray(flags.package)
      ? flags.package
      : [flags.package];
    return names.map((name) => {
      return workspace.packages.find((pkg) => {
        return pkg.info.name === name;
      });
    });
  }

  if (flags.group) {
    throw new Error('Unimplemented');
  }

  return workspace.packages;
}

module.exports = {
  command: 'build',
  aliases: ['b'],
  desc: 'build packages in the workspace',
  handler: build,
  builder(yargs) {
    yargs.options({
      group: {
        alias: 'g',
        describe: 'the name of a group of packages to build',
      },
      package: {
        alias: 'p',
        describe: 'the name of a package to build',
      },
    });
  },
};
