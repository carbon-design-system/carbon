import React from 'react';
import { addons } from '@storybook/addons';
import { CarbonThemePanel, CarbonTypePanel } from './components/LonelyPanel';
import {
  CARBON_THEMES_ADDON_ID,
  CARBON_THEME_PANEL_ID,
  CARBON_TYPE_ADDON_ID,
  CARBON_TYPE_PANEL_ID,
} from './shared';

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
