import React from 'react';
import { storiesOf } from '@storybook/react';
import Touch_124 from '../../../es/touch--1/24.js';

storiesOf('Touch_124', module)
  .add('default', () => <Touch_124 />)
  .add('with accessibility label', () => (
    <Touch_124 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Touch_124 aria-label="Icon label">
      <title>Icon title</title>
    </Touch_124>
  ));
