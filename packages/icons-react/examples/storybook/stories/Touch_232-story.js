import React from 'react';
import { storiesOf } from '@storybook/react';
import Touch_232 from '../../../es/touch--2/32.js';

storiesOf('Touch_232', module)
  .add('default', () => <Touch_232 />)
  .add('with accessibility label', () => (
    <Touch_232 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Touch_232 aria-label="Icon label">
      <title>Icon title</title>
    </Touch_232>
  ));
