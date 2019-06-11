/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const klaw = require('klaw-sync');
const os = require('os');
const path = require('path');
const replace = require('replace-in-file');

const tmpDir = os.tmpdir();

async function inline(options, info) {
  const { cwd } = info;
  const packageJsonPath = path.join(cwd, 'package.json');
  const sourceFolder = path.join(cwd, options.output);
  const inlineFolder = path.join(cwd, options.output, '_inlined');
  const vendorFolder = path.join(cwd, options.output, 'vendor');

  await Promise.all([fs.remove(inlineFolder), fs.remove(vendorFolder)]);

  await inlineSassDependencies(
    packageJsonPath,
    sourceFolder,
    vendorFolder,
    cwd
  );
}

async function inlineSassDependencies(
  packageJsonPath,
  sourceFolder,
  vendorFolder,
  cwd
) {
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error(`Expected a package.json file at ${packageJsonPath}`);
  }

  const packageJson = await fs.readJson(packageJsonPath);
  const { dependencies = {}, devDependencies = {} } = packageJson;
  const allPossibleDependencies = [
    ...Object.keys(dependencies),
    ...Object.keys(devDependencies),
  ];
  const inlinedDependencies = (await Promise.all(
    allPossibleDependencies.map(async dependency => {
      const [packageFolder, scssFolder] = await findSassModule(dependency, cwd);
      if (packageFolder) {
        const dependencyOutputFolder = path.join(vendorFolder, dependency);

        await fs.copy(scssFolder, dependencyOutputFolder);

        return [dependency, dependencyOutputFolder];
      }
    })
  )).filter(Boolean);

  if (inlinedDependencies.length === 0) {
    return;
  }

  const tmpFolder = await fs.mkdtemp(
    path.join(tmpDir, 'carbon-bundler-inline-')
  );
  const inlineFolder = path.join(sourceFolder, '_inlined');
  const inlineFilename = path.join(
    sourceFolder,
    `${path.basename(path.dirname(sourceFolder))}.scss`
  );

  await fs.copy(sourceFolder, tmpFolder, {
    filter(src) {
      if (src === vendorFolder) {
        return false;
      }

      if (src === inlineFilename) {
        return false;
      }

      if (path.basename(src) === 'index.scss') {
        return false;
      }

      return true;
    },
  });
  await fs.copy(tmpFolder, inlineFolder);
  await fs.remove(tmpFolder);

  const paths = klaw(inlineFolder, {
    nodir: true,
  });

  const REPLACE_REGEX = new RegExp(
    `^@import '(${inlinedDependencies.map(([name]) => name).join('|')})/scss`,
    'gm'
  );
  await Promise.all(
    paths.map(async file => {
      const relativeImportPath = path.relative(
        path.dirname(file.path),
        vendorFolder
      );

      await replace({
        files: file.path,
        from: REPLACE_REGEX,
        to(_, match) {
          return `@import '${relativeImportPath}/${match}`;
        },
      });
    })
  );
}

function findSassModule(packageName, cwd) {
  let currentDirectory = cwd;

  while (currentDirectory !== '/') {
    const nodeModulesFolder = path.join(currentDirectory, 'node_modules');
    const packageFolder = path.join(nodeModulesFolder, packageName);
    const scssFolder = path.join(packageFolder, 'scss');
    const packageJsonPath = path.join(packageFolder, 'package.json');

    if (fs.existsSync(scssFolder)) {
      return [packageFolder, scssFolder, packageJsonPath];
    }

    currentDirectory = path.dirname(currentDirectory);
  }

  return [false];
}

module.exports = inline;
