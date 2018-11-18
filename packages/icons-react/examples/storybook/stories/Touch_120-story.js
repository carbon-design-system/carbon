import React from 'react';
import { storiesOf } from '@storybook/react';
import Touch_120 from '../../../es/touch--1/20.js';

storiesOf('Touch_120', module)
  .add('default', () => <Touch_120 />)
  .add('with accessibility label', () => (
    <Touch_120 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Touch_120 aria-label="Icon label">
      <title>Icon title</title>
    </Touch_120>
  ));
