import React from 'react';
import { storiesOf } from '@storybook/react';
import Location32 from '../../../lib/location/32';

storiesOf('Location32', module)
  .add('default', () => <Location32 />)
  .add('with accessibility label', () => (
    <Location32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Location32 focusable>
      <title>Icon title</title>
    </Location32>
  ));
