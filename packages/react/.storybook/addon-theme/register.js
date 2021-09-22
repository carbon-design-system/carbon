/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { addons } from '@storybook/addons';
import { CarbonThemePanel, CarbonTypePanel } from './components/Panel';
import {
  CARBON_THEMES_ADDON_ID,
  CARBON_THEME_PANEL_ID,
  CARBON_TYPE_ADDON_ID,
  CARBON_TYPE_PANEL_ID,
} from './shared';

if (process.env.CARBON_REACT_STORYBOOK_USE_CUSTOM_PROPERTIES === 'true') {
  // Disabling because storybook addons doesn't provide proptypes or display names for these panels
  /* eslint-disable react/display-name, react/prop-types */
  addons.register(CARBON_THEMES_ADDON_ID, (api) => {
    addons.addPanel(CARBON_THEME_PANEL_ID, {
      title: 'Carbon Theme',
      render: ({ active, key }) => (
        <CarbonThemePanel api={api} key={key} active={active} />
      ),
    });
  });

  addons.register(CARBON_TYPE_ADDON_ID, (api) => {
    addons.addPanel(CARBON_TYPE_PANEL_ID, {
      title: 'Carbon Type',
      render: ({ active, key }) => (
        <CarbonTypePanel api={api} key={key} active={active} />
      ),
    });
  });
}
