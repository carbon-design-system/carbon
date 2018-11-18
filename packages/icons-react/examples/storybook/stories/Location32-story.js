import React from 'react';
import { storiesOf } from '@storybook/react';
import Location32 from '../../../es/location/32.js';

storiesOf('Location32', module)
  .add('default', () => <Location32 />)
  .add('with accessibility label', () => (
    <Location32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Location32 aria-label="Icon label">
      <title>Icon title</title>
    </Location32>
  ));
