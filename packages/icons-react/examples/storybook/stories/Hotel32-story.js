import React from 'react';
import { storiesOf } from '@storybook/react';
import Hotel32 from '../../../lib/Hotel/32';

storiesOf('Hotel32', module)
  .add('default', () => <Hotel32 />)
  .add('with accessibility label', () => (
    <Hotel32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Hotel32 focusable>
      <title>Icon title</title>
    </Hotel32>
  ));
