import React from 'react';
import { storiesOf } from '@storybook/react';
import ChevronSort24 from '../../../es/chevron--sort/24.js';

storiesOf('ChevronSort24', module)
  .add('default', () => <ChevronSort24 />)
  .add('with accessibility label', () => (
    <ChevronSort24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChevronSort24 aria-label="Icon label">
      <title>Icon title</title>
    </ChevronSort24>
  ));
