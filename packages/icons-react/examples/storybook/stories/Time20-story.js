import React from 'react';
import { storiesOf } from '@storybook/react';
import Time20 from '../../../es/time/20.js';

storiesOf('Time20', module)
  .add('default', () => <Time20 />)
  .add('with accessibility label', () => (
    <Time20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Time20 aria-label="Icon label">
      <title>Icon title</title>
    </Time20>
  ));
