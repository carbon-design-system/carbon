/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { addons } from '@storybook/addons';
import { CarbonThemesPanel /*, CarbonTypePanel */ } from './components/Panel';
import { CARBON_THEMES_ADDON_ID, CARBON_THEME_PANEL_ID } from './shared';

addons.register(CARBON_THEMES_ADDON_ID, (api) => {
  const channel = addons.getChannel();
  addons.addPanel(CARBON_THEME_PANEL_ID, {
    title: 'Carbon theme',
    render: ({ active, key }) => (
      <CarbonThemesPanel {...{ api, active, key, channel }} />
    ),
  });
});
