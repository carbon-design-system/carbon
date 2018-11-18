import React from 'react';
import { storiesOf } from '@storybook/react';
import Pin32 from '../../../es/pin/32.js';

storiesOf('Pin32', module)
  .add('default', () => <Pin32 />)
  .add('with accessibility label', () => (
    <Pin32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Pin32 aria-label="Icon label">
      <title>Icon title</title>
    </Pin32>
  ));
