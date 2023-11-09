/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const fs = require('fs-extra');
const { pascalCase } = require('change-case');

function formatGlobals(string) {
  const mappings = string.split(',').map((mapping) => {
    return mapping.split('=');
  });
  return mappings.reduce(
    (acc, [pkg, global]) => ({
      ...acc,
      [pkg]: global,
    }),
    {}
  );
}

function formatDependenciesIntoGlobals(dependencies) {
  return Object.keys(dependencies).reduce((acc, key) => {
    const parts = key.split('/').map((identifier, i) => {
      if (i === 0) {
        return identifier.replace(/@/, '');
      }
      return identifier;
    });

    return {
      ...acc,
      [key]: pascalCase(parts.join(' ')),
    };
  }, {});
}

async function findPackageFolder(entrypoint) {
  let packageFolder = entrypoint;

  while (packageFolder !== '/' && path.dirname(packageFolder) !== '/') {
    packageFolder = path.dirname(packageFolder);
    const packageJsonPath = path.join(packageFolder, 'package.json');

    if (await fs.pathExists(packageJsonPath)) {
      break;
    }
  }

  return packageFolder;
}

module.exports = {
  formatGlobals,
  formatDependenciesIntoGlobals,
  findPackageFolder,
};
