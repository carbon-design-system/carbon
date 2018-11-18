import React from 'react';
import { storiesOf } from '@storybook/react';
import Restaurant32 from '../../../es/restaurant/32.js';

storiesOf('Restaurant32', module)
  .add('default', () => <Restaurant32 />)
  .add('with accessibility label', () => (
    <Restaurant32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Restaurant32 aria-label="Icon label">
      <title>Icon title</title>
    </Restaurant32>
  ));
