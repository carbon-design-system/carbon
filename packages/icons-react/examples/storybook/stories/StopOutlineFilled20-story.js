import React from 'react';
import { storiesOf } from '@storybook/react';
import StopOutlineFilled20 from '../../../es/stop--outline--filled/20.js';

storiesOf('StopOutlineFilled20', module)
  .add('default', () => <StopOutlineFilled20 />)
  .add('with accessibility label', () => (
    <StopOutlineFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StopOutlineFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </StopOutlineFilled20>
  ));
