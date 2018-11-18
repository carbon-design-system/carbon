import React from 'react';
import { storiesOf } from '@storybook/react';
import Power24 from '../../../es/power/24.js';

storiesOf('Power24', module)
  .add('default', () => <Power24 />)
  .add('with accessibility label', () => (
    <Power24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Power24 aria-label="Icon label">
      <title>Icon title</title>
    </Power24>
  ));
