/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const semver = require('semver');
const { createHash } = require('./hash');

const packages = new Map();

function create(name, range) {
  if (!packages.has(name)) {
    packages.set(name, new Map());
  }

  const ranges = packages.get(name);
  if (ranges.has(range)) {
    return ranges.get(range);
  }

  const pkg = {
    name,
    version: range,
  };

  ranges.set(range, pkg);

  return pkg;
}

function equal(a, b) {
  if (a.name !== b.name) {
    return false;
  }

  return semver.eq(
    semver.valid(semver.coerce(a.version)),
    semver.valid(semver.coerce(b.version))
  );
}

function getPackageInfo(packageJson) {
  const scripts = Object.keys(packageJson.scripts || {});
  const dependencyTypes = [
    'peerDependencies',
    'dependencies',
    'devDependencies',
  ];
  const dependencies = [];

  for (const type of dependencyTypes) {
    if (!packageJson[type]) {
      continue;
    }

    for (const [name, version] of Object.entries(packageJson[type])) {
      dependencies.push({
        name,
        version,
      });
    }
  }

  return {
    name: packageJson.name,
    version: packageJson.version,
    scripts,
    dependencies,
  };
}

const Package = {
  create,
  equal,
  getPackageInfo,
};

module.exports = {
  Package,
};
