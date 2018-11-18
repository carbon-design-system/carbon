import React from 'react';
import { storiesOf } from '@storybook/react';
import Stop32 from '../../../es/stop/32.js';

storiesOf('Stop32', module)
  .add('default', () => <Stop32 />)
  .add('with accessibility label', () => (
    <Stop32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Stop32 aria-label="Icon label">
      <title>Icon title</title>
    </Stop32>
  ));
