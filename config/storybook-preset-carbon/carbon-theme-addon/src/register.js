import React from 'react';
import { addons, types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';

const ADDON_ID = 'myaddon';
const PANEL_ID = `${ADDON_ID}/panel`;

// give a unique name for the panel
const MyPanel = () => <div>MyAddon</div>;

addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'My Addon',
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <MyPanel />
      </AddonPanel>
    ),
  });
});