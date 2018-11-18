import React from 'react';
import { storiesOf } from '@storybook/react';
import ChevronSort20 from '../../../es/chevron--sort/20.js';

storiesOf('ChevronSort20', module)
  .add('default', () => <ChevronSort20 />)
  .add('with accessibility label', () => (
    <ChevronSort20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChevronSort20 aria-label="Icon label">
      <title>Icon title</title>
    </ChevronSort20>
  ));
