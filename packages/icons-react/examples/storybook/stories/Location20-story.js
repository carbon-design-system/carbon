import React from 'react';
import { storiesOf } from '@storybook/react';
import Location20 from '../../../es/location/20.js';

storiesOf('Location20', module)
  .add('default', () => <Location20 />)
  .add('with accessibility label', () => (
    <Location20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Location20 aria-label="Icon label">
      <title>Icon title</title>
    </Location20>
  ));
