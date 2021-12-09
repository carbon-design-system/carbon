/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const semver = require('semver');

const upgrades = [require('./v11').upgrade];

const Upgrades = {
  /**
   * @return {Array<WorkspaceUpgrades>}
   */
  getAvailableUpgradesFor(workspaces) {
    return workspaces
      .map((workspace) => {
        return {
          workspace,
          upgrades: upgrades.filter((upgrade) => {
            return upgrade.updates.every((update) => {
              for (const dependency of workspace.dependencies) {
                if (dependency.name !== update.package.name) {
                  continue;
                }

                return semver.intersects(
                  update.package.range,
                  dependency.version
                );
              }
              return false;
            });
          }),
        };
      })
      .filter((workspaceUpgrades) => {
        return workspaceUpgrades.upgrades.length > 0;
      });
  },
};

const UpgradeRunner = {
  async run(workspace, upgrade) {
    console.log(
      'Running upgrade: %s on workspace: %s',
      upgrade.name,
      workspace.name
    );

    const packageChanges = [];

    for (const update of upgrade.updates) {
      console.log('Updating package: %s', update.package.name);

      for (const migration of update.migrations) {
        console.log('Running migration: %s', migration.name);
        await migration.migrate();
      }

      for (const change of update.changes) {
        console.log('Apply change of type: %s', change.type);
        if (change.type === 'rename') {
          packageChanges.push({
            type: 'rename',
            name: update.package.name,
            to: change.to,
          });
        }

        if (change.type === 'remove') {
          packageChanges.push({
            type: 'remove',
            name: update.package.name,
          });
        }
      }
    }

    // Apply package.json changes
    console.log('package.json changes for %s', workspace.directory);
    console.log(packageChanges);
  },
};

module.exports = {
  Upgrades,
  UpgradeRunner,
};
