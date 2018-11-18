import React from 'react';
import { storiesOf } from '@storybook/react';
import StopOutlineFilled16 from '../../../es/stop--outline--filled/16.js';

storiesOf('StopOutlineFilled16', module)
  .add('default', () => <StopOutlineFilled16 />)
  .add('with accessibility label', () => (
    <StopOutlineFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StopOutlineFilled16 aria-label="Icon label">
      <title>Icon title</title>
    </StopOutlineFilled16>
  ));
