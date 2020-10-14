/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { addons, types } from '@storybook/addons';
import { CarbonTypePanel } from './components/Panel';
import { CARBON_TYPE_ADDON_ID, CARBON_TYPE_PANEL_ID } from './shared';

if (process.env.CARBON_REACT_STORYBOOK_USE_CUSTOM_PROPERTIES === 'true') {
  addons.register(CARBON_TYPE_ADDON_ID, (api) => {
    addons.addPanel(CARBON_TYPE_PANEL_ID, {
      title: 'Carbon type',
      render: ({ active, key }) => (
        <CarbonTypePanel api={api} key={key} active={active} />
      ),
    });
  });
}
