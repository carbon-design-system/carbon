import React from 'react';
import { configure, setAddon, addDecorator } from '@storybook/react';
import infoAddon, { setDefaults } from '@storybook/addon-info';
import { setOptions } from '@storybook/addon-options';
import { checkA11y } from 'storybook-addon-a11y';
import Container from './Container';

setOptions({
  name: `carbon components react`,
  url: 'https://github.com/IBM/carbon-components-react',
});

// addon-info defaults
setDefaults({
  maxPropStringLength: 200, // Displays the first 200 characters in the default prop string
});
setAddon(infoAddon);

addDecorator(story => <Container story={story} />);
// addDecorator(checkA11y);

function loadStories() {
  const req = require.context('../src/components', true, /\-story\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
