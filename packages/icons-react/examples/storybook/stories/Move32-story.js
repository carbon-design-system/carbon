import React from 'react';
import { storiesOf } from '@storybook/react';
import Move32 from '../../../es/move/32.js';

storiesOf('Move32', module)
  .add('default', () => <Move32 />)
  .add('with accessibility label', () => (
    <Move32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Move32 aria-label="Icon label">
      <title>Icon title</title>
    </Move32>
  ));
