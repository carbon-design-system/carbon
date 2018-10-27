import React from 'react';
import { storiesOf } from '@storybook/react';
import Restaurant32 from '../../../lib/restaurant/32';

storiesOf('Restaurant32', module)
  .add('default', () => <Restaurant32 />)
  .add('with accessibility label', () => (
    <Restaurant32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Restaurant32 focusable>
      <title>Icon title</title>
    </Restaurant32>
  ));
