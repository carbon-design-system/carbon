import React from 'react';
import { storiesOf } from '@storybook/react';
import Pin20 from '../../../es/pin/20.js';

storiesOf('Pin20', module)
  .add('default', () => <Pin20 />)
  .add('with accessibility label', () => (
    <Pin20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Pin20 aria-label="Icon label">
      <title>Icon title</title>
    </Pin20>
  ));
