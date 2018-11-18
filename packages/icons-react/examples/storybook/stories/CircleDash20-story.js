import React from 'react';
import { storiesOf } from '@storybook/react';
import CircleDash20 from '../../../es/circle-dash/20.js';

storiesOf('CircleDash20', module)
  .add('default', () => <CircleDash20 />)
  .add('with accessibility label', () => (
    <CircleDash20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CircleDash20 aria-label="Icon label">
      <title>Icon title</title>
    </CircleDash20>
  ));
