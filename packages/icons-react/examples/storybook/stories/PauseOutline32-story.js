import React from 'react';
import { storiesOf } from '@storybook/react';
import PauseOutline32 from '../../../es/pause--outline/32.js';

storiesOf('PauseOutline32', module)
  .add('default', () => <PauseOutline32 />)
  .add('with accessibility label', () => (
    <PauseOutline32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PauseOutline32 aria-label="Icon label">
      <title>Icon title</title>
    </PauseOutline32>
  ));
