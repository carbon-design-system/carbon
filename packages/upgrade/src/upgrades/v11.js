/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { Upgrade } = require('./upgrade');

const v11 = Upgrade.create({
  name: 'v11',
  updates: [
    {
      package: {
        name: 'carbon-components-react',
        range: '10.x',
      },
      migrations: [
        {
          name: 'sample migration',
          async migrate() {
            console.log('Applying migration: sample migration');
          },
        },
      ],
      changes: [
        {
          type: 'rename',
          to: '@carbon/react',
        },
      ],
    },
    {
      package: {
        name: 'carbon-icons',
        range: '7.x',
      },
      migrations: [],
      changes: [
        {
          type: 'remove',
        },
      ],
    },
  ],
});

module.exports = {
  upgrade: v11,
};
