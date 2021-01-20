import React from 'react';
import { addons } from '@storybook/addons';
import { LonelyPanel } from './components/LonelyPanel';
import {
  CARBON_THEMES_ADDON_ID,
  CARBON_THEME_PANEL_ID,
  CARBON_TYPE_ADDON_ID,
  CARBON_TYPE_PANEL_ID,
} from './shared';

// give a unique name for the panel
// const LonelyPanel = () => <div>Lonely Addon Panel</div>;

// if (process.env.CARBON_REACT_STORYBOOK_USE_CUSTOM_PROPERTIES === 'true') {
  addons.register(CARBON_THEMES_ADDON_ID, (api) => {
    addons.addPanel(CARBON_THEME_PANEL_ID, {
      title: 'LONELY PANEL',
      render: ({ active, key }) => (
        <LonelyPanel api={api} key={key} active={active} />
      ),
    });
  });

//   addons.register(CARBON_TYPE_ADDON_ID, (api) => {
//     addons.addPanel(CARBON_TYPE_PANEL_ID, {
//       title: 'LONELY PANEL',
//       render: ({ active, key }) => (
//         <LonelyPanel api={api} key={key} active={active} />
//       ),
//     });
//   });
// }
