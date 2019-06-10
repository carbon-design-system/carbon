/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const packageJson = require('../package.json');

const WORKSPACE_NODE_MODULES = path.resolve(__dirname, '../../../node_modules');
const BUNDLE_DIR = path.resolve(__dirname, '../scss');
const dependencies = Object.keys(packageJson.dependencies).map(key => {
  return [key, path.join(WORKSPACE_NODE_MODULES, key)];
});

async function clean() {
  await Promise.all(
    dependencies.map(([_dependency, dependencyPath]) => {
      return fs.remove(path.join(BUNDLE_DIR, path.basename(dependencyPath)));
    })
  );
}

clean().catch(error => {
  console.error(error);
});
