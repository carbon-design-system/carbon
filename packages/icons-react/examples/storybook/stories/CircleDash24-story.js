import React from 'react';
import { storiesOf } from '@storybook/react';
import CircleDash24 from '../../../es/circle-dash/24.js';

storiesOf('CircleDash24', module)
  .add('default', () => <CircleDash24 />)
  .add('with accessibility label', () => (
    <CircleDash24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CircleDash24 aria-label="Icon label">
      <title>Icon title</title>
    </CircleDash24>
  ));
