/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

'use strict';

const fs = require('fs-extra');
const klaw = require('klaw-sync');
const path = require('path');
const replace = require('replace-in-file');
const packageJson = require('../package.json');

const WORKSPACE_NODE_MODULES = path.resolve(__dirname, '../../../node_modules');
const BUNDLE_DIR = path.resolve(__dirname, '../scss');
const dependencies = Object.keys(packageJson.dependencies).map(key => {
  return [key, path.join(WORKSPACE_NODE_MODULES, key)];
});

async function build() {
  // Copy scss folders over
  await Promise.all(
    dependencies.map(async ([_dependency, dependencyPath]) => {
      const scssFolder = path.join(dependencyPath, 'scss');
      if (!(await fs.pathExists(scssFolder))) {
        return;
      }
      await fs.copy(
        scssFolder,
        path.join(BUNDLE_DIR, path.basename(dependencyPath))
      );
    })
  );

  // Replace `@carbon` imports with relative paths
  const paths = klaw(BUNDLE_DIR, {
    nodir: true,
    filter(item) {
      const paths = item.path.split('/');
      const filename = paths[paths.length - 1];
      const folder = paths[paths.length - 3];

      if (folder === 'elements') {
        if (filename === 'index.scss' || filename === 'elements.scss') {
          return false;
        }
      }

      return true;
    },
  });

  await Promise.all(
    paths.map(async file => {
      const relativeImportPath = path.relative(
        path.dirname(file.path),
        BUNDLE_DIR
      );
      await replace({
        files: file.path,
        // Regex should match the following package patterns:
        // @carbon/packagename
        // @carbon/package-name
        // Where the package name is the captured group in `match`
        from: /@carbon\/(\w+[-\w]*)\/scss/g,
        to(_, match) {
          return `${relativeImportPath}/${match}`;
        },
      });
    })
  );
}

build().catch(error => {
  console.error(error);
});
