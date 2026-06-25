/**
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { addons, types } from '@storybook/manager-api';

import { Panel } from './Panel';

const ADDON_ID = 'carbonTheme';
const PANEL_ID = `${ADDON_ID}/panel`;

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Carbon Theme',
    render: Panel,
  });
});
