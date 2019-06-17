/**
 * Copyright IBM Corp. 2019, 2019
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

'use strict';

const cloneDeep = require('lodash.clonedeep');
const diff = require('jest-diff');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const path = require('path');
const semver = require('semver');
const { UpgradeError } = require('./error');
const { supportedPackages } = require('./migrations');
const { reporter } = require('./reporter');

async function run(packageName, from, to, options) {
  if (!supportedPackages.has(packageName)) {
    throw new UpgradeError(
      `No support available for package \`${packageName}\``
    );
  }

  const packageMigrations = supportedPackages.get(packageName);
  const migrationsForVersion = find(packageMigrations, versionMigration => {
    return versionMigration.version === to;
  });
  const migration = migrationsForVersion.from.find(migration => {
    return semver.intersects(migration.version, from);
  });

  if (!migration) {
    throw new UpgradeError(
      `No support available for updating package \`${packageName}\` to ` +
        `version ${to} from ${from}`
    );
  }

  reporter.info(
    'Running migration for:',
    packageName,
    'from:',
    from,
    'to:',
    to
  );

  await migration.migrate(options);
}

async function runInDirectory(options) {
  const packageJsonPath = path.join(options.cwd, 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    throw new UpgradeError(
      `Unable to find a \`package.json\` file at ${packageJsonPath}. ` +
        `Please run at the root of your project where this file is located.`
    );
  }

  const packageJson = await fs.readJson(packageJsonPath);
  const {
    dependencies = {},
    devDependencies = {},
    peerDependencies = {},
  } = packageJson;
  const packageDependencies = [
    ...Object.keys(dependencies).map(name => ({
      name,
      version: dependencies[name],
      type: 'dependencies',
    })),
    ...Object.keys(devDependencies).map(name => ({
      name,
      version: devDependencies[name],
      type: 'devDependencies',
    })),
    ...Object.keys(peerDependencies).map(name => ({
      name,
      version: peerDependencies[name],
      type: 'peerDependencies',
    })),
  ]
    .reduce((acc, pkg) => {
      if (acc.find(({ name }) => name === pkg.name)) {
        return acc;
      }
      return acc.concat(pkg);
    }, [])
    .filter(pkg => supportedPackages.has(pkg.name));

  if (packageDependencies.length === 0) {
    reporter.info(
      "Yikes! We're sorry, but there does not seem to be a package in your " +
        '`package.json` file that we can migrate.'
    );
    process.exit(1);
  }

  const questions = packageDependencies.map(dependency => {
    const { name, version } = dependency;
    const supportedVersions = supportedPackages.get(name);
    return {
      name,
      type: 'list',
      message: `Choose which version you would like to migrate to for ${name}`,
      choices: [...supportedVersions]
        .filter(supportedVersion => {
          return semver.satisfies(supportedVersion.version, version);
        })
        .map(supportedVersion => ({
          name: supportedVersion.version,
        })),
    };
  });

  const answers = await inquirer.prompt(questions);
  const nextPackageJson = cloneDeep(packageJson);

  for (const name of Object.keys(answers)) {
    const dependency = packageDependencies.find(
      dependency => dependency.name === name
    );
    const to = answers[name];

    await run(dependency.name, dependency.version, to, options);

    nextPackageJson[dependency.type][dependency.name] = to;
  }

  if (options.dry) {
    reporter.info('Your package.json file will change to:');
    console.log();
    console.log(diff(nextPackageJson, packageJson, { expand: false }));
    console.log();
  } else {
    await fs.writeJson(packageJsonPath, nextPackageJson, {
      spaces: 2,
    });
  }

  reporter.info(
    "Migrations completed successfully! Make sure to run your project's install" +
      'command to get the latest dependencies'
  );
}

function find(set, cb) {
  for (const item of set) {
    if (cb(item)) {
      return item;
    }
  }
}

module.exports = {
  run,
  runInDirectory,
};
