import React from 'react';
import { storiesOf } from '@storybook/react';
import Pin24 from '../../../es/pin/24.js';

storiesOf('Pin24', module)
  .add('default', () => <Pin24 />)
  .add('with accessibility label', () => (
    <Pin24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Pin24 aria-label="Icon label">
      <title>Icon title</title>
    </Pin24>
  ));
