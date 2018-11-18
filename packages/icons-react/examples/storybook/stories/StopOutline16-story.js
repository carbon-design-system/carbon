import React from 'react';
import { storiesOf } from '@storybook/react';
import StopOutline16 from '../../../es/stop--outline/16.js';

storiesOf('StopOutline16', module)
  .add('default', () => <StopOutline16 />)
  .add('with accessibility label', () => (
    <StopOutline16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StopOutline16 aria-label="Icon label">
      <title>Icon title</title>
    </StopOutline16>
  ));
