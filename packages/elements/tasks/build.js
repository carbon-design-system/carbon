/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const klaw = require('klaw-sync');
const path = require('path');
const replace = require('replace-in-file');
const packageJson = require('../package.json');

const WORKSPACE_NODE_MODULES = path.resolve(__dirname, '../../../node_modules');
const BUNDLE_DIR = path.resolve(__dirname, '../scss/bundled');
const dependencies = Object.keys(packageJson.dependencies).map(key => {
  return [key, path.join(WORKSPACE_NODE_MODULES, key)];
});

async function build() {
  // Copy scss folders over
  await Promise.all(
    dependencies.map(async ([dependency, dependencyPath]) => {
      const scssFolder = path.join(dependencyPath, 'scss');
      if (!(await fs.pathExists(scssFolder))) {
        return;
      }

      await fs.copy(scssFolder, path.join(BUNDLE_DIR, dependency, 'scss'));
    })
  );

  // Replace `@carbon` imports with relative paths
  const paths = klaw(BUNDLE_DIR, {
    nodir: true,
  });

  await Promise.all(
    paths.map(async file => {
      const relativeImportPath = path.relative(
        file.path,
        path.join(BUNDLE_DIR, '@carbon')
      );
      await replace({
        files: file.path,
        from: /\@carbon/g,
        to: `${relativeImportPath}/@carbon`,
      });
    })
  );
}

build().catch(error => {
  console.error(error);
});
