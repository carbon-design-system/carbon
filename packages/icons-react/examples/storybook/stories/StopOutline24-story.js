import React from 'react';
import { storiesOf } from '@storybook/react';
import StopOutline24 from '../../../es/stop--outline/24.js';

storiesOf('StopOutline24', module)
  .add('default', () => <StopOutline24 />)
  .add('with accessibility label', () => (
    <StopOutline24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StopOutline24 aria-label="Icon label">
      <title>Icon title</title>
    </StopOutline24>
  ));
