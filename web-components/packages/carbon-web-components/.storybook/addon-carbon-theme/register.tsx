/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import addons from '@storybook/addons';
import Panel from './components/Panel';
import { ADDON_ID, PANEL_ID } from './shared';

addons.register(ADDON_ID, api => {
  addons.addPanel(PANEL_ID, {
    title: 'Carbon theme',
    // eslint-disable-next-line react/prop-types
    render: ({ active, key }) => (
      <Panel api={api} key={key} active={Boolean(active)} />
    ),
  });
});
