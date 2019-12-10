/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import addons from '@storybook/addons';
import { withInfo } from '@storybook/addon-info';
import { configureActions } from '@storybook/addon-actions';
// import { checkA11y } from 'storybook-addon-a11y';
import {
  CARBON_CURRENT_THEME,
  CARBON_TYPE_TOKEN,
} from './addon-carbon-theme/shared';
import Container from './Container';

const customPropertyPrefix = 'cds';

addDecorator(
  withInfo({
    styles: {
      children: {
        width: '100%',
      },
    },
    maxPropStringLength: 200, // Displays the first 200 characters in the default prop string
  })
);

addParameters({
  options: {
    theme: {
      brandTitle: 'carbon components react',
      brandUrl:
        'https://github.com/carbon-design-system/carbon/tree/master/packages/react',
    },
  },
});

configureActions({
  depth: 3,
  limit: 10,
});

addDecorator(story => <Container story={story} />);
// addDecorator(checkA11y);

addons.getChannel().on(CARBON_CURRENT_THEME, theme => {
  document.documentElement.setAttribute('storybook-carbon-theme', theme);
});

addons.getChannel().on(CARBON_TYPE_TOKEN, ({ tokenName, tokenValue }) => {
  const root = document.documentElement;
  const [fontSize, lineHeight] = tokenValue.split('-');
  const rem = px =>
    `${px /
      parseFloat(getComputedStyle(document.documentElement).fontSize)}rem`;
  root.style.setProperty(
    `--${customPropertyPrefix}-${tokenName}-font-size`,
    rem(fontSize)
  );
  root.style.setProperty(
    `--${customPropertyPrefix}-${tokenName}-line-height`,
    rem(lineHeight)
  );
});

function loadStories() {
  const req = require.context('../src/components', true, /\-story\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
