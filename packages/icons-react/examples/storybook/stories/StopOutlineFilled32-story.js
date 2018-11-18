import React from 'react';
import { storiesOf } from '@storybook/react';
import StopOutlineFilled32 from '../../../es/stop--outline--filled/32.js';

storiesOf('StopOutlineFilled32', module)
  .add('default', () => <StopOutlineFilled32 />)
  .add('with accessibility label', () => (
    <StopOutlineFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StopOutlineFilled32 aria-label="Icon label">
      <title>Icon title</title>
    </StopOutlineFilled32>
  ));
