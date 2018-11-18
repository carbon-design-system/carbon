import React from 'react';
import { storiesOf } from '@storybook/react';
import Hotel32 from '../../../es/hotel/32.js';

storiesOf('Hotel32', module)
  .add('default', () => <Hotel32 />)
  .add('with accessibility label', () => (
    <Hotel32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Hotel32 aria-label="Icon label">
      <title>Icon title</title>
    </Hotel32>
  ));
