import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withOptions } from '@storybook/addon-options';
import { initializeRTL } from 'storybook-addon-rtl';
// import { checkA11y } from 'storybook-addon-a11y';
import Container from './Container';

addDecorator(
  withInfo({
    maxPropStringLength: 200, // Displays the first 200 characters in the default prop string
  })
);

addDecorator(
  withOptions({
    name: `carbon components react`,
    url: 'https://github.com/IBM/carbon-components-react',
  })
);

addDecorator(story => <Container story={story} />);
// addDecorator(checkA11y);

function loadStories() {
  const req = require.context('../src/components', true, /\-story\.js$/);
  req.keys().forEach(filename => req(filename));
}

initializeRTL();

configure(loadStories, module);
