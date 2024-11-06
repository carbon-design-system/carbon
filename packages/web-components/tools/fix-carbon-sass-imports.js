/**
 * @license
 *
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('node:path');
const fs = require('node:fs');
const localCarbonPath = [__dirname, '..', 'node_modules', '@carbon'];
const rootCarbonPath = [__dirname, '..', '..', '..', 'node_modules', '@carbon'];

// map of root Carbon package to local Carbon Sass module index
const modulesMap = new Map([
  ['colors', 'styles/scss/_colors.scss'],
  ['feature-flags', 'styles/scss/_feature-flags.scss'],
  ['motion', 'styles/scss/_motion.scss'],
]);

modulesMap.forEach((localModuleIndex, packageName) => {
  const localModuleIndexPath = path.join(...localCarbonPath, localModuleIndex);
  const localCarbonExists = fs.existsSync(localModuleIndexPath);
  const projectDependencyPath = path.join(...rootCarbonPath, packageName);
  const projectCarbonExists = fs.existsSync(projectDependencyPath);
  if (!localCarbonExists) {
    throw new Error(
      `Could not find local Carbon Sass module for ${packageName}`
    );
  }
  if (!projectCarbonExists) {
    throw new Error(
      `Could not find Carbon ${packageName} package in project root dependencies`
    );
  }
  const localModuleContents = fs.readFileSync(localModuleIndexPath, 'utf8');
  const relativePath = path.relative(
    // go up one directory to offset filename in filepath
    path.resolve(localModuleIndexPath, '..'),
    projectDependencyPath
  );
  const [fixedPath] = relativePath.split('/@carbon/');
  if (localModuleContents.includes(fixedPath)) {
    console.log(
      `Skipping ${localModuleIndex} as it already has the correct path`
    );
    return;
  }
  const newContents = localModuleContents.replace(
    "@forward '@carbon",
    `@forward '${fixedPath}/@carbon`
  );

  fs.writeFileSync(localModuleIndexPath, newContents, 'utf8');
});
