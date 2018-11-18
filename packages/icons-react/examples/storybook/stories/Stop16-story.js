import React from 'react';
import { storiesOf } from '@storybook/react';
import Stop16 from '../../../es/stop/16.js';

storiesOf('Stop16', module)
  .add('default', () => <Stop16 />)
  .add('with accessibility label', () => (
    <Stop16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Stop16 aria-label="Icon label">
      <title>Icon title</title>
    </Stop16>
  ));
