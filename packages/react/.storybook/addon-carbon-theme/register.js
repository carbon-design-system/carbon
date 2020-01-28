/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import addons from '@storybook/addons';
import { CarbonThemesPanel, CarbonTypePanel } from './components/Panel';
import {
  CARBON_THEMES_ADDON_ID,
  CARBON_THEME_PANEL_ID,
  CARBON_TYPE_ADDON_ID,
  CARBON_TYPE_PANEL_ID,
} from './shared';

addons.register(CARBON_THEMES_ADDON_ID, api => {
  addons.addPanel(CARBON_THEME_PANEL_ID, {
    title: 'Carbon theme',
    render: ({ active, key }) => (
      <CarbonThemesPanel api={api} key={key} active={active} />
    ),
  });
});

addons.register(CARBON_TYPE_ADDON_ID, api => {
  addons.addPanel(CARBON_TYPE_PANEL_ID, {
    title: 'Carbon type',
    render: ({ active, key }) => (
      <CarbonTypePanel api={api} key={key} active={active} />
    ),
  });
});
