import React from 'react';
import { storiesOf } from '@storybook/react';
import Touch_132 from '../../../es/touch--1/32.js';

storiesOf('Touch_132', module)
  .add('default', () => <Touch_132 />)
  .add('with accessibility label', () => (
    <Touch_132 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Touch_132 aria-label="Icon label">
      <title>Icon title</title>
    </Touch_132>
  ));
