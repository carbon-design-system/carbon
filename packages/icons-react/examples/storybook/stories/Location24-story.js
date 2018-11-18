import React from 'react';
import { storiesOf } from '@storybook/react';
import Location24 from '../../../es/location/24.js';

storiesOf('Location24', module)
  .add('default', () => <Location24 />)
  .add('with accessibility label', () => (
    <Location24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Location24 aria-label="Icon label">
      <title>Icon title</title>
    </Location24>
  ));
