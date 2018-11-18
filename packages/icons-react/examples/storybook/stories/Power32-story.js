import React from 'react';
import { storiesOf } from '@storybook/react';
import Power32 from '../../../es/power/32.js';

storiesOf('Power32', module)
  .add('default', () => <Power32 />)
  .add('with accessibility label', () => (
    <Power32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Power32 aria-label="Icon label">
      <title>Icon title</title>
    </Power32>
  ));
