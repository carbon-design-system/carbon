/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import addons from '@storybook/addons';
import React, { useEffect } from 'react';
import { CARBON_CURRENT_THEME, CARBON_THEME_DEFAULT } from '../shared';

const channel = addons.getChannel();

// eslint-disable-next-line react/prop-types
export const CarbonThemeDecorator = ({ value, children }) => {
  const setCarbonTheme = (theme) => {
    document.documentElement.setAttribute('storybook-carbon-theme', theme);
  };

  useEffect(() => {
    channel.on(CARBON_CURRENT_THEME, setCarbonTheme);

    setCarbonTheme(value || CARBON_THEME_DEFAULT);

    return () => {
      channel.removeListener(CARBON_CURRENT_THEME, setCarbonTheme);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{children}</div>;
};
