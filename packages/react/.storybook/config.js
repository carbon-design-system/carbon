import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { configureActions } from '@storybook/addon-actions';
// import { checkA11y } from 'storybook-addon-a11y';
import Container from './Container';

addDecorator(
  withInfo({
    maxPropStringLength: 200, // Displays the first 200 characters in the default prop string
  })
);

addParameters({
  options: {
    theme: {
      brandTitle: 'carbon components react',
      brandUrl: 'https://github.com/IBM/carbon-components-react',
    },
  },
});

configureActions({
  depth: 3,
  limit: 10,
});

addDecorator(story => <Container story={story} />);
// addDecorator(checkA11y);

function loadStories() {
  const req = require.context('../src/components', true, /\-story\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
