/**
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { useGlobals } from '@storybook/manager-api';

import { AddonPanel } from '@storybook/components';
import { PARAM_KEY } from './constants';
import { PanelContent } from './components/PanelContent';

export const Panel = (props) => {
  const [globals, updateGlobals] = useGlobals();
  const globalCarbonTheme = globals[PARAM_KEY];

  return (
    <AddonPanel {...props}>
      <PanelContent
        theme={globalCarbonTheme}
        onChange={(value) => {
          updateGlobals({ [PARAM_KEY]: value });
        }}
      />
    </AddonPanel>
  );
};
