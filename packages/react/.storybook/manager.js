/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { create } from '@storybook/theming/create';
import { addons } from '@storybook/addons';
import { configureActions } from '@storybook/addon-actions';
import {
  CARBON_CURRENT_THEME,
  CARBON_TYPE_TOKEN,
} from './addon-carbon-theme/shared';
import PackageInfo from './../package.json';

const customPropertyPrefix = 'cds';

const theme = create({
  base: 'light',
  brandTitle: `Carbon Components React v${PackageInfo.version}`,
  brandUrl:
    'https://github.com/carbon-design-system/carbon/tree/master/packages/react',
});

addons.setConfig({
  theme,
});

configureActions({
  depth: 3,
  limit: 10,
});

addons.getChannel().on(CARBON_CURRENT_THEME, (theme) => {
  document.documentElement.setAttribute('storybook-carbon-theme', theme);
});

addons.getChannel().on(CARBON_TYPE_TOKEN, ({ tokenName, tokenValue }) => {
  const root = document.documentElement;
  const [fontSize, lineHeight] = tokenValue.split('-');
  const rem = (px) =>
    `${
      px / parseFloat(getComputedStyle(document.documentElement).fontSize)
    }rem`;
  root.style.setProperty(
    `--${customPropertyPrefix}-${tokenName}-font-size`,
    rem(fontSize)
  );
  root.style.setProperty(
    `--${customPropertyPrefix}-${tokenName}-line-height`,
    rem(lineHeight)
  );
});

// These options used by storybook often conflict with developer tools,
// conditional panels, or other things that get in the way of our workflow
localStorage.removeItem('@storybook/ui/store');
localStorage.removeItem('storybook-layout');
