import React from 'react';
import { storiesOf } from '@storybook/react';
import Move24 from '../../../es/move/24.js';

storiesOf('Move24', module)
  .add('default', () => <Move24 />)
  .add('with accessibility label', () => (
    <Move24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Move24 aria-label="Icon label">
      <title>Icon title</title>
    </Move24>
  ));
