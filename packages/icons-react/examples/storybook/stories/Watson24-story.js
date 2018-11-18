import React from 'react';
import { storiesOf } from '@storybook/react';
import Watson24 from '../../../es/watson/24.js';

storiesOf('Watson24', module)
  .add('default', () => <Watson24 />)
  .add('with accessibility label', () => (
    <Watson24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Watson24 aria-label="Icon label">
      <title>Icon title</title>
    </Watson24>
  ));
