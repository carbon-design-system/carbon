import React from 'react';
import { storiesOf } from '@storybook/react';
import Watson32 from '../../../es/watson/32.js';

storiesOf('Watson32', module)
  .add('default', () => <Watson32 />)
  .add('with accessibility label', () => (
    <Watson32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Watson32 aria-label="Icon label">
      <title>Icon title</title>
    </Watson32>
  ));
