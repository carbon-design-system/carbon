import React from 'react';
import { storiesOf } from '@storybook/react';
import StopOutline32 from '../../../es/stop--outline/32.js';

storiesOf('StopOutline32', module)
  .add('default', () => <StopOutline32 />)
  .add('with accessibility label', () => (
    <StopOutline32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StopOutline32 aria-label="Icon label">
      <title>Icon title</title>
    </StopOutline32>
  ));
