import React from 'react';
import { storiesOf } from '@storybook/react';
import CircleDash32 from '../../../es/circle-dash/32.js';

storiesOf('CircleDash32', module)
  .add('default', () => <CircleDash32 />)
  .add('with accessibility label', () => (
    <CircleDash32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CircleDash32 aria-label="Icon label">
      <title>Icon title</title>
    </CircleDash32>
  ));
