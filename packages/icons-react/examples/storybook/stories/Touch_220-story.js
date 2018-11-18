import React from 'react';
import { storiesOf } from '@storybook/react';
import Touch_220 from '../../../es/touch--2/20.js';

storiesOf('Touch_220', module)
  .add('default', () => <Touch_220 />)
  .add('with accessibility label', () => (
    <Touch_220 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Touch_220 aria-label="Icon label">
      <title>Icon title</title>
    </Touch_220>
  ));
