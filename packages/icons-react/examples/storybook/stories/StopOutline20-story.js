import React from 'react';
import { storiesOf } from '@storybook/react';
import StopOutline20 from '../../../es/stop--outline/20.js';

storiesOf('StopOutline20', module)
  .add('default', () => <StopOutline20 />)
  .add('with accessibility label', () => (
    <StopOutline20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StopOutline20 aria-label="Icon label">
      <title>Icon title</title>
    </StopOutline20>
  ));
