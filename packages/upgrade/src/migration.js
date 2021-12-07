/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const semver = require('semver');
const migrations = require('./migrations');

const codes = {
  // The migration is supported for the current workspace for the matching
  // dependency
  SUPPORTED: 'supported',
  // The migration is supported for the current dependency in the workspace but
  // the version range does not intersect
  RANGE_MISMATCH: 'range_mismatch',
};

/**
 * Get the currently supported migrations
 * @returns {Array<Migration>}
 */
function getMigrations() {
  return migrations;
}

function getMigrationsByWorkspace(workspaces, migrations) {
  return workspaces
    .map((workspace) => {
      const { dependencies } = workspace;

      dependencies.forEach((dependency) => {
        if (dependency.name === 'carbon-components-react') {
          if (dependency.version !== '7.50.0') {
            // console.log('does not meet range limit');
          } else {
            // console.log('meets range limit. we can upgrade to @carbon/react');
          }
        }
      });

      return {
        workspace,
        migrationOptions: migrations
          .filter((migration) => {
            // returns undefined if a dependency does not match any
            // of the supported dependencies for migration
            // if it matches a supported dependency, it returns
            // type, name, and version in an object.
            //{type: 'devDependencies', name: 'carbon-components-react', version: '^6.0.0'}
            return dependencies.find((dependency) => {
              return dependency.name === migration.packageName;
            });
          })
          .map((migration) => {
            // returns similar object but only for dependencies that have a migration
            //{type: 'devDependencies', name: 'carbon-components-react', version: '^6.0.0'}
            const dependency = dependencies.find((dependency) => {
              return dependency.name === migration.packageName;
            });

            //checking to see if the dependency is within the migration range
            if (semver.intersects(migration.from, dependency.version)) {
              // dependency is within range to migrate
              console.log(
                'SEMVER INTERSECTS',
                migration.packageName,
                dependency.version,
                'to',
                migration.to
              );
              return {
                dependency,
                migration,
                available: true,
                code: codes.SUPPORTED,
              };
            }

            // dependency is not within range to migrate
            return {
              dependency,
              migration,
              available: false,
              code: codes.RANGE_MISMATCH,
            };
          }),
      };
    })
    .filter((workspace) => {
      return workspace.migrationOptions.length > 0;
    });
}

function applyMigrations() {}

/**
 * A module for finding and running migrations
 */
const Migration = {
  codes,
  getMigrations,
  getMigrationsByWorkspace,
  applyMigrations,
};

module.exports = {
  Migration,
};
