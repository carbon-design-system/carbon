/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const Upgrade = {
  create({ name, updates }) {
    return {
      name,
      updates,
    };
  },
};

// components only
// components,react,icons
// components,react,icons,@icons

const PackageJsonChange = {
  uninstall: {
    type: 'uninstall',
  },
  install({ name, version }) {
    return {
      type: 'install',
      package: {
        name,
        version,
      },
    };
  },
};

const v11 = Upgrade.create({
  name: 'v11',
  packages: [
    {
      name: 'carbon-components-react',
      range: '10.x',
      migrations: [
        {
          name: 'migration name',
          async migrate(mode = 'dry') {
            console.log('applying migration in %s mode', mode);
          },
          // extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
      packageJsonChanges: [
        PackageJsonChange.uninstall,
        PackageJsonChange.install({
          name: '@carbon/react',
          version: 'latest',
        }),
      ],
    },
  ],
});

// const Upgrades = {};
// const UpgradeRunner = {};
