/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const { findPackageJson } = require('./project');
const { reporter } = require('./reporter');
const safeAsync = require('./tools/safeAsync');
const supportedPackageMigrations = require('./migrations');

async function run({ cwd, dry }) {
  reporter.info('Thanks for trying out carbon-upgrade! 🙏');

  const [result, findPackageJsonError] = await safeAsync(findPackageJson(cwd));
  if (findPackageJsonError) {
    throw new Error(`Unable to find package.json file in: ${cwd}`);
  }

  const [packageJsonPath] = result;
  const packageJson = await fs.readJson(packageJsonPath);
  const { dependencies = {}, devDependencies = {} } = packageJson;
  const packageDependencies = [
    ...Object.keys(dependencies).map(name => ({
      name,
      version: dependencies[name],
      type: 'dependency',
    })),
    ...Object.keys(devDependencies).map(name => ({
      name,
      version: devDependencies[name],
      type: 'devDependency',
    })),
  ];

  // TODO: make sure we don't double run a migration for a dependency

  const dependenciesToMigrate = packageDependencies
    .map(dependency => {
      if (supportedPackageMigrations.has(dependency.name)) {
        const packageMigrations = supportedPackageMigrations.get(
          dependency.name
        );

        for (const migration of packageMigrations) {
          for (const { migrate, version } of migration.from) {
            if (version === dependency.version) {
              return [dependency, migrate, version];
            }
          }
        }
      }
      return false;
    })
    .filter(Boolean);

  await Promise.all(
    dependenciesToMigrate.map(([dependency, migrate]) => {
      // TODO update package.json, making sure to respect dry option
      return migrate(dependency, cwd);
    })
  );

  reporter.success('Done! ✨');
}

module.exports = run;
