/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const semver = require('semver');

const supported = [
  {
    packageName: 'react',
    // the range we would like to migrate *from*
    from: '>=16',
    // the version we would like to migrate *to*
    to: '17.0.0',

    async migrate(workspace) {
      console.log(
        'migrate the react package in the %s workspace',
        workspace.name
      );
    },
  },
  {
    packageName: 'react-dom',
    // the range we would like to migrate *from*
    from: '>=16',
    // the version we would like to migrate *to*
    to: '17.0.0',

    async migrate(workspace) {
      console.log(
        'migrate the react-dom package in the %s workspace',
        workspace.name
      );
    },
  },
];

const codes = {
  // The migration is supported for the current workspace for the matching
  // dependency
  SUPPORTED: 'supported',
  // The migration is supported for the current dependency in the workspace but
  // the version range does not intersect
  RANGE_MISMATCH: 'range_mismatch',
};

const Migration = {
  codes,
  getMigrations() {
    return supported;
  },
  getMigrationsByWorkspace(project, migrations) {
    return project.workspaces
      .map((workspace) => {
        const { dependencies } = workspace;

        return {
          ...workspace,
          options: migrations
            .filter((migration) => {
              return dependencies.has(migration.packageName);
            })
            .map((migration) => {
              const dependency = dependencies.get(migration.packageName);
              if (semver.intersects(migration.from, dependency.version)) {
                return {
                  dependency,
                  migration,
                  available: true,
                  code: codes.SUPPORTED,
                };
              }

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
        return workspace.options.length > 0;
      });
  },
  applyMigrations(workspaces) {
    for (const workspace of workspaces) {
      console.log(workspace.options);
      //
    }
  },
};

module.exports = {
  Migration,
};
